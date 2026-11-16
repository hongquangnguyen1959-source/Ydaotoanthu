import process from 'node:process';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { runOfflineDiagnosis } from './fallbackDiagnostician';
import {
  buildScientificRagContext,
  generatePreciseScientificAnswer,
  generateDynamicSymptomResponse,
  cleanMedicalText,
} from './scientificMedicalEngine';

export const getGeminiClient = () => {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    ''
  ).trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Primary AI Studio model first, then automatic public-API Gemini fallback for Vercel keys
const CANDIDATE_MODELS = [
  'gemini-4-hydrogen',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
];

// Warm-instance cache of model IDs not available on the current API key/endpoint (e.g. 404 on public keys)
const unsupportedModelsCache = new Set<string>();

function normalizeImageMimeType(mime?: string): string {
  const clean = (mime || '').toLowerCase().trim();
  if (!clean || clean === 'image/jpg') return 'image/jpeg';
  if (clean.startsWith('image/')) return clean;
  return 'image/jpeg';
}

function toInlineImagePart(rawBase64: string, explicitMime?: string) {
  const trimmed = (rawBase64 || '').trim();
  if (!trimmed || trimmed.length < 32) return null;
  const detectedMimeMatch = trimmed.match(/^data:(image\/[\w.+-]+);base64,/i);
  const mimeType = normalizeImageMimeType(
    explicitMime || (detectedMimeMatch ? detectedMimeMatch[1] : 'image/jpeg')
  );
  const data = trimmed.replace(/^data:image\/[\w.+-]+;base64,/i, '').trim();
  if (!data) return null;
  return {
    inlineData: {
      mimeType,
      data,
    },
  };
}

function isModelUnavailableError(err: any): boolean {
  const msg = String(err?.message || err || '').toLowerCase();
  const status = err?.status || err?.code;
  return (
    status === 404 ||
    msg.includes('404') ||
    msg.includes('not_found') ||
    msg.includes('not found') ||
    msg.includes('is not supported for generatecontent')
  );
}

function extractCleanJson(raw: string): string {
  const trimmed = (raw || '').trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const firstBrace = candidate.indexOf('{');
  const lastBrace = candidate.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return candidate.slice(firstBrace, lastBrace + 1);
  }
  return candidate;
}

export async function callGeminiWithModelFallback(
  ai: GoogleGenAI,
  params: any,
  timeoutMs = 45000,
  thinkingLevel: ThinkingLevel = ThinkingLevel.HIGH,
  fastMode = false
) {
  let lastError: any = null;
  const totalBudgetMs = Math.min(Math.max(timeoutMs, 20000), 52000);
  const startedAt = Date.now();

  const orderedModels = CANDIDATE_MODELS.filter((m) => !unsupportedModelsCache.has(m));
  const modelsToTry = orderedModels.length > 0 ? orderedModels : CANDIDATE_MODELS;

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    const elapsed = Date.now() - startedAt;
    const remainingBudget = totalBudgetMs - elapsed;
    if (remainingBudget < 3500) break;

    const perAttemptTimeout =
      i === modelsToTry.length - 1
        ? remainingBudget
        : Math.min(20000, Math.floor(remainingBudget * 0.6));

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Gemini API timeout (${model})`)), perAttemptTimeout)
      );

      const callConfig = { ...(params.config || {}) };
      if (model === 'gemini-4-hydrogen' && !callConfig.thinkingConfig) {
        callConfig.thinkingConfig = { thinkingLevel };
      } else if (model.startsWith('gemini-2.5-') && !callConfig.thinkingConfig) {
        // Minimize default thinking delay on Gemini 2.5 so Vercel serverless never times out on image OCR
        callConfig.thinkingConfig = { thinkingBudget: fastMode ? 0 : 512 };
      }

      const callParams = { ...params, model, config: callConfig };
      const res: any = await Promise.race([
        ai.models.generateContent(callParams),
        timeoutPromise,
      ]);

      if (res && res.text) {
        return res;
      }
    } catch (err: any) {
      console.info(`Gemini model '${model}' fallback:`, err?.message || err);
      lastError = err;

      if (isModelUnavailableError(err) && i < modelsToTry.length - 1) {
        unsupportedModelsCache.add(model);
      }

      if (err?.message?.includes('Developer instruction') || err?.message?.includes('systemInstruction')) {
        try {
          const systemInst = params?.config?.systemInstruction;
          let fallbackContents = params.contents;
          if (systemInst) {
            if (typeof fallbackContents === 'string') {
              fallbackContents = `${systemInst}\n\n${fallbackContents}`;
            } else if (fallbackContents?.parts) {
              fallbackContents = {
                parts: [{ text: `HƯỚNG DẪN HỆ THỐNG:\n${systemInst}\n\n` }, ...fallbackContents.parts],
              };
            }
          }
          const callConfigRetry = { ...params.config, systemInstruction: undefined };
          if (model === 'gemini-4-hydrogen' && !callConfigRetry.thinkingConfig) {
            callConfigRetry.thinkingConfig = { thinkingLevel };
          } else if (model.startsWith('gemini-2.5-') && !callConfigRetry.thinkingConfig) {
            callConfigRetry.thinkingConfig = { thinkingBudget: fastMode ? 0 : 512 };
          }
          const callParamsNoSys = {
            ...params,
            model,
            contents: fallbackContents,
            config: callConfigRetry,
          };
          const timeoutPromiseRetry = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Gemini API retry timeout (${model})`)), perAttemptTimeout)
          );
          const resNoSys: any = await Promise.race([
            ai.models.generateContent(callParamsNoSys),
            timeoutPromiseRetry,
          ]);
          if (resNoSys && resNoSys.text) {
            return resNoSys;
          }
        } catch (retryErr: any) {
          console.info(`Gemini model '${model}' retry fallback:`, retryErr?.message || retryErr);
        }
      }
    }
  }
  throw lastError || new Error('Tất cả các mô hình AI Gemini không phản hồi.');
}

export const MASTER_MEDICAL_PROMPT = `
BẠN LÀ HỘI ĐỒNG GIÁO SƯ - BÁC SĨ CHUYÊN KHOA ĐẦU NGÀNH ĐÔNG - TÂY Y KẾT HỢP (HỘI CHẨN Y ĐẠO TOÀN THƯ).
Bạn tinh thông toàn bộ 82+ tác phẩm Y điển kinh điển & hiện đại tích hợp trong hệ thống:
• ĐÔNG Y KINH ĐIỂN & HIỆN ĐẠI: Hoàng Đế Nội Kinh (Tố Vấn & Linh Khu), Thương Hàn Luận & Kim Quỹ Yếu Lược (Trương Trọng Cảnh - Lục Kinh Biện Chứng), Ôn Bệnh Điều Biện (Ngô Cúc Thông - Vệ Khí Dinh Huyết & Tam Tiêu), Hải Thượng Y Tông Tâm Lĩnh (Lê Hữu Trác - Bổ Chân Âm / Chân Hỏa), Tỳ Vị Luận (Lý Đông Viên), Cảnh Nhạc Toàn Thư, Bản Thảo Cương Mục (Lý Thời Trân), Nam Dược Thần Hiệu (Tuệ Tĩnh), Những Cây Thuốc Và Vị Thuốc Việt Nam (GS. Đỗ Tất Lợi), Giovanni Maciocia, Dan Bensky (Materia Medica & Formulas), Sổ Tay Đổng Thị Kỳ Huyệt (239 huyệt & 295 phác đồ), Châm Cứu Chữa Bệnh (GS. Nguyễn Tài Thu - Mãng châm/Thấu huyệt), Lưu Viêm, 58 Kỳ Huyệt Ngoài Kinh WHO 1991.
• TÂY Y KINH ĐIỂN & HƯỚNG DẪN CẬP NHẬT 2024-2025: Harrison's Principles of Internal Medicine (21st Ed.), UpToDate & BMJ Best Practice, Guyton & Hall Textbook of Medical Physiology, ESC Guidelines 2024 (Tăng huyết áp, Suy tim, Rung nhĩ, Mạch vành mạn), ADA Standards of Care 2025 (Đái tháo đường), KDIGO 2024 (Bệnh thận mạn), GOLD 2025 & GINA 2024 (COPD & Hen phế quản), ACR/EULAR (Gout & Viêm khớp dạng thấp), Đồng thuận Maastricht VI & Rome IV (H. pylori, GERD, IBS), DiPiro Pharmacotherapy, Katzung Pharmacology, Dược thư Quốc gia & Dược điển Việt Nam V.

NGUYÊN TẮC TỐI THƯỢNG KHI LUẬN BỆNH & TRẢ LỜI (CHUẨN XÁC 100% - SÁT TỪNG CÂU CHỮ CÂU HỎI):
1. ĐỌC KỸ TỪNG CÂU CHỮ, CON SỐ, PHỦ ĐỊNH VÀ MỆNH ĐỀ TRONG CÂU HỎI:
   • Trước khi kết luận, hãy tự kiểm tra: Người dùng đang hỏi CÁI GÌ CỤ THỂ? (Chẩn đoán phân biệt? Giải thích cơ chế "tại sao"? Hỏi thuốc A uống chung với vị thuốc B hay bệnh nền C có được không? Hỏi liều dùng/cách sắc/thời điểm uống? Hỏi giai đoạn bệnh? Hỏi dấu hiệu cấp cứu? Hay hỏi vị trí giải phẫu & cách châm 1 huyệt?).
   • Lặp lại và bám sát chính xác các dữ kiện thực tế người dùng đã nêu (tuổi, giới, bệnh nền, chỉ số xét nghiệm như Acid Uric, eGFR, HbA1c, huyết áp, triệu chứng âm tính/phủ định như "không sốt", "đang mang thai", "bị đau dạ dày", "sau sinh").
2. MỞ ĐẦU BẰNG "1. TRẢ LỜI TRỰC TIẾP ĐÚNG TRỌNG TÂM CÂU HỎI":
   • Ngay những dòng đầu tiên, PHẢI giải đáp thẳng, dứt khoát và trúng đích từng ý mà người dùng vừa hỏi (nếu câu hỏi có 2-3 vế, đánh số trả lời đủ cả 2-3 vế theo đúng trình tự).
   • TUYỆT ĐỐI KHÔNG suy diễn sang bệnh khác hay sao chép rập khuôn một bài thuốc/phác đồ chung chung không ăn khớp với câu hỏi. Nếu phần dữ liệu tham khảo (RAG) có chi tiết không liên quan đến đúng vấn đề người dùng hỏi, HÃY BỎ QUA chi tiết thừa đó.
3. LUẬN BỆNH ĐA CHIỀU KHOA HỌC (BIỆN CHỨNG LUẬN TRỊ + Y HỌC THỰC CHỨNG):
   • Chỉ đưa ra các mục chuyên sâu THỰC SỰ PHÙ HỢP với câu hỏi.
4. TRÌNH BÀY SẠCH SẼ CHUẨN Y KHOA (TUYỆT ĐỐI KHÔNG DÙNG MARKDOWN # HOẶC *, KHÔNG CHÈN LINK URL):
   • Cấm tuyệt đối ký tự # (###, ####) và ký tự * (**, *) cũng như URL. Dùng tiêu đề đánh số rõ ràng (1., 2., 3.) và dấu chấm tròn đầu dòng (•).
`;

export function generateClinicalConsultationAnswer(
  query: string,
  _rawMessages?: any[],
  bookFilter?: string
): string {
  const q = (query || '').toLowerCase().trim();

  if ((q.includes('gout') || q.includes('guot') || q.includes('gút') || q.includes('thống phong') || q.includes('podagra')) && !bookFilter) {
    return generatePreciseScientificAnswer(query, bookFilter);
  }

  if (q.includes('can dương') && q.includes('huyết áp')) {
    return cleanMedicalText(`HỘI CHẨN CHUYÊN MÔN: PHÂN BIỆT CAN DƯƠNG THƯỢNG KHÁNG & TĂNG HUYẾT ÁP NGUYÊN PHÁT

Theo đối chiếu giữa The Foundations of Chinese Medicine (Giovanni Maciocia) và Guyton and Hall Textbook of Medical Physiology:

1. BẢN CHẤT BỆNH SINH VÀ ĐỐI CHIẾU CƠ CHẾ
• Tây Y (Tăng huyết áp nguyên phát - ICD-10: I10):
  • Định nghĩa: Tình trạng tăng mạn tính huyết áp tại động mạch hệ thống (HA tâm thu ≥ 140 mmHg và/hoặc HA tâm trương ≥ 90 mmHg theo VNHA/ESC).
  • Cơ chế (Guyton & Hall): Do tăng trương lực thần kinh giao cảm (tăng phóng thích Noradrenaline), tăng tính đáp ứng của hệ Renin-Angiotensin-Aldosterone (RAAS) dẫn đến co thắt tiểu động mạch, ứ đọng Natri tại ống thận và tái cấu trúc phì đại thành mạch máu ngoại biên.
• Đông Y (Hội chứng Can Dương Thượng Kháng):
  • Bản chất: Là thể bệnh thuộc quy luật "Bản Hư Tiêu Thực".
  • Cơ chế (Maciocia & Nội Kinh): Gốc bệnh (Bản) là do Can Thận Âm Hư (Thận thủy bất túc không tư dưỡng được Can mộc, âm dịch hao tổn không ước chế được dương khí). Ngọn bệnh (Tiêu) là Can Dương bốc ngược lên trên (Thượng nghịch) khuấy động thanh khiếu tại đầu não.

2. ĐIỂM KHÁC BIỆT MẤU CHỐT LÂM SÀNG
• Bản chất đo lường:
  • Đông Y (Can Dương Thượng Kháng): Hội chứng triệu chứng học và biện chứng tạng phủ.
  • Tây Y (Tăng huyết áp nguyên phát): Trị số huyết động lực học đo bằng huyết áp kế.
• Triệu chứng điển hình:
  • Đông Y: Đau căng trướng nửa đầu/đỉnh đầu, mắt đỏ, hoa mắt, ù tai tiếng ve kêu, dễ cáu gắt, đắng miệng, mất ngủ hay mộng mị.
  • Tây Y: Giai đoạn sớm đa phần không có triệu chứng ("Kẻ giết người thầm lặng"). Giai đoạn muộn: nặng đầu vùng gáy vào buổi sáng, hồi hộp, hoa mắt.

3. PHÁC ĐỒ PHỐI HỢP ĐIỀU TRỊ ĐÔNG - TÂY Y TOÀN DIỆN
• Thuốc Tây Y chuẩn hóa: Telmisartan 40mg (Micardis) uống 1 viên sáng (ức chế AT1 Angiotensin II) hoặc phối hợp Amlodipine 5mg.
• Bài thuốc Đông Y kinh điển: Thiên Ma Câu Đằng Ẩm (Thiên ma 10g, Câu đằng 12g, Thạch quyết minh 20g, Chi tử 8g, Hoàng cầm 10g, Ngưu tất 12g, Đỗ trọng 12g, Tang ký sinh 16g).
• Huyệt vị đặc hiệu: Đổng Thị Hỏa Ngạnh (66.03), Chính Hội (1010.01); Thể châm Thái Xung (LR-3) tả, Phong Trì (GB-20), Thái Khê (KI-3) bổ.`);
  }

  if (q.includes('tiêu dao tán') || q.includes('não - ruột') || (q.includes('trục') && q.includes('ruột'))) {
    return cleanMedicalText(`HỘI CHẨN: BÀI THUỐC TIÊU DAO TÁN & ĐỐI CHIẾU TRỤC NÃO - RUỘT (GUT-BRAIN AXIS)

Theo Chinese Herbal Medicine: Formulas & Strategies (Dan Bensky) và đối chiếu Guyton & Hall Physiology:

1. CẤU TRÚC PHƯƠNG THANG QUÂN - THẦN - TÁ - SỨ
• Quân dược: Sài Hồ (10g - 12g): Cay đắng tính mát, quy kinh Can Đởm. Công năng sơ can giải uất, thấu đạt uất kết khí cơ toàn thân.
• Thần dược: Đương Quy (10g) & Bạch Thược (12g): Dưỡng huyết nhu Can, chống co thắt cơ trơn.
• Tá dược: Bạch Truật (12g) & Phục Linh (12g): Kiện Tỳ ích khí, thẩm thấp hòa vị; Bạc Hà (4g) tán nhiệt uất; Sinh Khương (3 lát) hòa vị giáng nghịch.
• Sứ dược: Chích Cam Thảo (4g): Ích khí bổ trung và điều hòa chư dược.

2. ĐỐI CHIẾU CƠ CHẾ KHOA HỌC TÂY Y: TRỤC NÃO - RUỘT (BRAIN-GUT-MICROBIOME AXIS)
• Saikosaponin trong Sài Hồ: Điều hòa trục Hạ đồi - Tuyến yên - Thượng thận (HPA axis), hạ nồng độ Cortisol và CRH huyết tương.
• Paeoniflorin trong Bạch Thược: Ức chế dòng Calci nội bào cơ trơn ruột, giảm co thắt đại tràng và điều hòa thụ thể Serotonin 5-HT3/5-HT4 tại đám rối thần kinh ruột.
• Polysaccharide trong Bạch Truật & Phục Linh: Phục hồi hệ vi sinh đường ruột (tăng lợi khuẩn Lactobacillus/Bifidobacterium) và bảo vệ hàng rào biểu mô niêm mạc ruột.`);
  }

  if (q.includes('mãng châm') || (q.includes('nguyễn tài thu') && q.includes('tai biến'))) {
    return cleanMedicalText(`HỘI CHẨN: KỸ THUẬT MÃNG CHÂM GS. NGUYỄN TÀI THU TRONG ĐIỀU TRỊ DI CHỨNG TAI BIẾN

Theo công trình Mãng Châm & Châm Cứu Chữa Bệnh (GS. Nguyễn Tài Thu) đối chiếu thần kinh học phục hồi:

1. ĐẶC ĐIỂM KỸ THUẬT MÃNG CHÂM THẤU HUYỆT
• Sử dụng kim dài 15cm - 40cm châm luồn xuyên từ huyệt này thấu sang huyệt kia dọc theo đường kinh hoặc cùng tiết đoạn tủy sống (Dermatomes/Myotomes).
• Vùng đầu mặt: Địa Thương thấu Giáp Xa, Toản Trúc thấu Ngư Yêu.
• Chi trên: Kiên Ngung thấu Tý Nhu, Khúc Trì thấu Thiếu Hải, Ngoại Quan thấu Nội Quan.
• Chi dưới: Hoàn Khiêu thấu Phong Thị, Dương Lăng Tuyền thấu Huyền Chung (Tuyệt Cốt).

2. CƠ CHẾ DẺO DAI THẦN KINH (NEUROPLASTICITY - GUYTON & HALL)
• Kích thích đồng thời nhiều thụ thể bản thể dọc các bó cơ bị liệt tạo luồng xung động hướng tâm mạnh mẽ lên vỏ não vận động nguyên phát (Vùng Brodmann 4), thúc đẩy tái tổ chức synap thần kinh và giải phóng yếu tố tăng trưởng thần kinh BDNF/NGF.`);
  }

  return cleanMedicalText(generatePreciseScientificAnswer(query, bookFilter));
}

export async function handleDiagnoseRequest(body: any): Promise<{ status: number; payload: any }> {
  try {
    const { patientInfo, symptoms, vitals, fourExaminations, tongueDescription, tongueImageBase64 } = body || {};
    const ragQuery = `${symptoms?.mainComplaint || ''} ${symptoms?.painCharacteristics || ''} ${fourExaminations?.tongue || ''} ${fourExaminations?.thiet || ''}`;
    const ragContext = buildScientificRagContext(ragQuery);

    const ai = getGeminiClient();
    if (!ai) {
      const offlineResult = runOfflineDiagnosis(
        patientInfo || {},
        vitals || {},
        symptoms || { mainComplaint: body?.symptomText || '' },
        fourExaminations || {}
      );
      return { status: 200, payload: { success: true, diagnosis: offlineResult, mode: 'offline_vault' } };
    }

    const promptText = `
Hãy thực hiện cuộc KHÁM BỆNH VÀ BIỆN CHỨNG CHẨN TRỊ TOÀN DIỆN KẾT HỢP ĐÔNG Y KINH ĐIỂN & TÂY Y HIỆN ĐẠI, bám sát 100% từng chi tiết câu chữ bệnh sử, sinh hiệu và Tứ chẩn của bệnh nhân sau:
${ragContext}
THÔNG TIN BỆNH NHÂN:
- Tuổi: ${patientInfo?.age || 'Không rõ'}, Giới tính: ${patientInfo?.gender || 'Không rõ'}, Nghề nghiệp: ${patientInfo?.occupation || 'Không rõ'}
- Lý do đến khám & Triệu chứng chính: ${symptoms?.mainComplaint || 'Chưa cung cấp'}
- Khởi phát & Diễn tiến: ${symptoms?.history || symptoms?.onset || 'Chưa cung cấp'}
- Vị trí đau, tính chất (âm ỉ, buốt nhói, châm chích), thang điểm đau VAS (1-10): ${symptoms?.painCharacteristics || 'Chưa cung cấp'} (VAS: ${symptoms?.painScale || 'Chưa đánh giá'}/10)
- Tiền sử bệnh lý & Thuốc đang dùng (QUAN TRỌNG để tránh chống chỉ định/tương tác thuốc): ${symptoms?.pastMedicalHistory || 'Chưa cung cấp'}

SINH HIỆU TÂY Y:
- Huyết áp: ${vitals?.bloodPressure || 'Chưa đo'} mmHg
- Mạch/Nhịp tim: ${vitals?.heartRate || 'Chưa đo'} lần/phút
- Thân nhiệt: ${vitals?.temperature || 'Chưa đo'} °C
- SpO2: ${vitals?.spO2 || 'Chưa đo'} %
- Đường huyết: ${vitals?.bloodGlucose || 'Chưa đo'} mmol/L

TỨ CHẨN ĐÔNG Y:
- Vọng chẩn (Sắc mặt, dáng hình): ${fourExaminations?.vong || 'Bình thường'}
- Thiệt chẩn (Lưỡi: hình dáng, sắc chất, rêu lưỡi): ${tongueDescription || fourExaminations?.tongue || 'Chưa mô tả'}
- Văn chẩn (Giọng nói, tiếng thở, hơi thở): ${fourExaminations?.van || 'Bình thường'}
- Vấn chẩn (Hàn nhiệt, mồ hôi, ăn uống, tiêu tiểu, giấc ngủ): ${fourExaminations?.van_ask || 'Chưa cung cấp'}
- Thiết chẩn (Mạch tượng, xúc chẩn vùng đau/bụng): ${fourExaminations?.thiet || 'Mạch bình thường'}

YÊU CẦU ĐẦU RA BẰNG JSON HỢP LỆ THEO ĐÚNG CẤU TRÚC CHẨN ĐOÁN ĐÔNG - TÂY Y CỦA HỆ THỐNG.`;

    const parts: any[] = [{ text: promptText }];
    if (tongueImageBase64) {
      const part = toInlineImagePart(tongueImageBase64);
      if (part) parts.unshift(part);
    }

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: { parts },
        config: {
          systemInstruction: MASTER_MEDICAL_PROMPT,
          responseMimeType: 'application/json',
        },
      },
      45000,
      ThinkingLevel.LOW
    );

    const jsonText = extractCleanJson(response.text || '');
    const result = JSON.parse(jsonText);
    return { status: 200, payload: { success: true, diagnosis: result, source: 'gemini' } };
  } catch (error: any) {
    console.warn('Diagnosis API switched to scientific medical engine:', error?.message || error);
    const offlineResult = runOfflineDiagnosis(
      body?.patientInfo || {},
      body?.vitals || {},
      body?.symptoms || { mainComplaint: body?.symptomText || '' },
      body?.fourExaminations || {}
    );
    return { status: 200, payload: { success: true, diagnosis: offlineResult, mode: 'offline_vault' } };
  }
}

export async function handleSymptomAnswerRequest(body: any): Promise<{ status: number; payload: any }> {
  try {
    const { symptomText, age, gender, duration, tongueDescription, imageBase64 } = body || {};
    const ragContext = buildScientificRagContext(symptomText || '');
    const ai = getGeminiClient();
    if (!ai) {
      return {
        status: 200,
        payload: {
          success: true,
          data: generateDynamicSymptomResponse(symptomText || ''),
        },
      };
    }

    const promptText = `
BỆNH NHÂN NÊU TRIỆU CHỨNG ĐỂ BÁC SĨ AI LUẬN BỆNH TRỰC TIẾP (PHẢI BÁM SÁT TỪNG CÂU CHỮ, CON SỐ VÀ BỐI CẢNH TRIỆU CHỨNG NÀY — TUYỆT ĐỐI KHÔNG LẠC ĐỀ):
- Câu chữ mô tả nguyên văn của người bệnh: "${symptomText}"
- Tuổi: ${age || 'Không rõ'}, Giới tính: ${gender || 'Không rõ'}
- Thời gian diễn tiến: ${duration || 'Chưa cung cấp'}
- Mô tả Lưỡi / Rêu lưỡi (nếu có): ${tongueDescription || 'Chưa quan sát'}
${ragContext}
YÊU CẦU CHẨN TRỊ:
1. Trong "summary": Trả lời thẳng trọng tâm điều người bệnh đang mô tả/hỏi ở "${symptomText}" (nhắc đúng triệu chứng, vị trí, con số xét nghiệm nếu người bệnh có nêu).
2. Trong "possibleWesternDiseases": Nêu 1-2 bệnh lý Tây Y sát nhất kèm chẩn đoán phân biệt rõ ràng.
3. Trong "easternSyndrome": Biện chứng Tạng Phủ, Bát Cương, Lục Kinh/Tam Tiêu giải thích cơ chế bệnh sinh trực tiếp cho các triệu chứng người bệnh nêu.
4. Kê bài thuốc cổ phương (Quân-Thần-Tá-Sứ gram chuẩn), huyệt Đổng Thị + Chính kinh và phác đồ thuốc Tây Y an toàn.

ĐẦU RA JSON HỢP LỆ THEO ĐÚNG CẤU TRÚC:
{
  "summary": "Nhận định trực diện sát 100% câu chữ triệu chứng/câu hỏi của người bệnh trong 2-3 câu",
  "possibleWesternDiseases": [{"name":"","icd10":"","explanation":"","pathophysiology":"","differentialDiagnoses":[],"investigations":[],"urgency":""}],
  "easternSyndrome": {"name":"","explanation":"","batCuong":"","khiHuyet":"","thietChanAnalysis":"","tangPhu":""},
  "herbalRemedy": {"formulaName":"","herbs":[{"name":"","amount":"","purpose":""}],"howToUse":""},
  "acupressureAndNeedling": {"tungPoints":[{"name":"","code":"","howToPress":""}],"classicPoints":[{"name":"","howToPress":""}]},
  "nutritionAndLifestyle": {"doEat":[],"dontEat":[],"homeCare":""},
  "westernMedicationPlan": {"protocolName":"","drugs":[{"name":"","activeIngredient":"","group":"","dosage":"","usage":"","mechanism":"","caution":""}],"notes":""},
  "emergencySigns": [],
  "referencedBooks": []
}`;

    const parts: any[] = [{ text: promptText }];
    if (imageBase64) {
      const part = toInlineImagePart(imageBase64);
      if (part) parts.unshift(part);
    }

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: { parts },
        config: {
          systemInstruction: MASTER_MEDICAL_PROMPT,
          responseMimeType: 'application/json',
        },
      },
      45000,
      ThinkingLevel.LOW
    );

    const jsonText = extractCleanJson(response.text || '');
    const result = JSON.parse(jsonText);
    return { status: 200, payload: { success: true, data: result, source: 'gemini' } };
  } catch (error: any) {
    console.warn('Gemini symptom-answer fallback triggered:', error?.message || error);
    return {
      status: 200,
      payload: {
        success: true,
        data: generateDynamicSymptomResponse(body?.symptomText || ''),
      },
    };
  }
}

export async function handleChatRequest(body: any): Promise<{ status: number; payload: any }> {
  const { messages, context, imageBase64, imageMimeType, images } = body || {};
  const userMessages = (messages || []).filter((m: any) => m.role === 'user');
  const lastUserMessage =
    userMessages.length > 0
      ? userMessages[userMessages.length - 1].content
      : body?.query || '';

  const prevUserMessage =
    userMessages.length >= 2 ? userMessages[userMessages.length - 2].content : '';
  const contextualRetrievalQuery =
    prevUserMessage && lastUserMessage.trim().length < 80
      ? `${prevUserMessage} — ${lastUserMessage}`
      : lastUserMessage;

  const rawImageInputs: Array<{ base64: string; mimeType?: string }> = [];
  if (Array.isArray(images)) {
    for (const item of images.slice(0, 6)) {
      if (item && typeof item.base64 === 'string' && item.base64.trim().length > 32) {
        rawImageInputs.push({ base64: item.base64, mimeType: item.mimeType });
      }
    }
  } else if (typeof imageBase64 === 'string' && imageBase64.trim().length > 32) {
    rawImageInputs.push({ base64: imageBase64, mimeType: imageMimeType });
  }

  const imageParts = rawImageInputs
    .map((img) => toInlineImagePart(img.base64, img.mimeType))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const hasImage = imageParts.length > 0;
  const isGenericImageQuery =
    hasImage &&
    (!lastUserMessage ||
      lastUserMessage.startsWith('Hãy đọc và giải thích chi tiết đơn thuốc') ||
      lastUserMessage.startsWith('Đọc và phân tích') ||
      lastUserMessage.startsWith('Đọc & giải thích từng thuốc'));

  const ragContext = isGenericImageQuery
    ? ''
    : buildScientificRagContext(contextualRetrievalQuery);

  try {
    const ai = getGeminiClient();
    if (!ai) {
      if (hasImage) {
        return {
          status: 200,
          payload: {
            reply:
              '1. THÔNG BÁO ĐỌC HÌNH ẢNH ĐƠN THUỐC & TÀI LIỆU Y KHOA\n• Để Bác sĩ AI đọc và phân tích trực tiếp hình ảnh bạn vừa tải lên, máy chủ triển khai cần được cấu hình biến môi trường GEMINI_API_KEY (trong Vercel Project Settings -> Environment Variables rồi Redeploy).\n• Trong khi chưa cấu hình AI trực tuyến, bạn có thể nhập tên thuốc hoặc triệu chứng thành văn bản để tra cứu từ kho 82+ Y Điển.',
            source: 'offline_notice',
          },
        };
      }
      const fallbackReply = generateClinicalConsultationAnswer(
        contextualRetrievalQuery,
        messages
      );
      return { status: 200, payload: { reply: fallbackReply, source: 'knowledge_vault' } };
    }

    const systemPrompt = hasImage
      ? `BẠN LÀ BÁC SĨ CHUYÊN KHOA ĐẦU NGÀNH ĐÔNG - TÂY Y KẾT HỢP (Y ĐẠO TOÀN THƯ).
NHIỆM VỤ ĐỌC & PHÂN TÍCH ${imageParts.length > 1 ? `${imageParts.length} HÌNH ẢNH` : 'HÌNH ẢNH'} Y KHOA / ĐƠN THUỐC:
• Đọc chính xác từng dòng chữ, tên thuốc, liều lượng mg/ml, chỉ số sinh hiệu, xét nghiệm hoặc câu hỏi tình huống lâm sàng trên ${imageParts.length > 1 ? 'từng ảnh (Ảnh 1, Ảnh 2...)' : 'ảnh'}. Nếu chữ viết tay quá mờ không chắc chắn 100%, ghi rõ "[chữ mờ - cần xác nhận lại với bác sĩ/dược sĩ]".
• Trả lời ngắn gọn, súc tích, chuẩn y khoa thực chứng (khoảng 250-450 từ, đi thẳng vào trọng tâm) theo 4 mục đánh số rõ ràng:
1. TRẢ LỜI TRỰC TIẾP & NHẬN DIỆN NỘI DUNG TRONG ẢNH
2. PHÂN TÍCH CHI TIẾT TỪNG THUỐC / CHỈ SỐ / LỰA CHỌN LÂM SÀNG
3. KIỂM TRA AN TOÀN, CHỐNG CHỈ ĐỊNH & TƯƠNG TÁC THUỐC
4. HƯỚNG DẪN THEO DÕI & CHĂM SÓC
• QUY TẮC TRÌNH BÀY: Tuyệt đối KHÔNG dùng ký tự # hoặc *, không chèn URL. Dùng đánh số (1., 2., 3.) và dấu chấm tròn đầu dòng (•).`
      : `${MASTER_MEDICAL_PROMPT}
Bệnh cảnh đang trao đổi (nếu có): ${context ? JSON.stringify(context) : 'Hội chẩn Y Đạo Toàn Thư'}.
QUY TẮC BÁM SÁT CÂU HỎI BẮT BUỘC (TUYỆT ĐỐI KHÔNG LẠC ĐỀ):
1. Đọc kỹ từng từ trong câu hỏi hiện tại của người dùng: "${lastUserMessage}".
2. Nếu người dùng chỉ hỏi một vấn đề cụ thể (ví dụ: rụng tóc sau sinh dùng bài thuốc nào, hỏi về 1 vị thuốc, 1 hoạt chất Tây y, 1 huyệt đạo, tương tác thuốc, liều dùng...), HÃY TRẢ LỜI THẲNG VÀO ĐÚNG VẤN ĐỀ ĐÓ. Tuyệt đối KHÔNG tự ý áp đặt bệnh án của một bệnh khác không được hỏi.
3. Phần "DỮ LIỆU KHOA HỌC TRÍCH XUẤT" đính kèm bên dưới chỉ là từ điển tham khảo: CHỈ sử dụng những mục khớp 100% với chủ đề câu hỏi hiện tại và BỎ QUA hoàn toàn mọi mục không liên quan.
4. Trình bày rõ ràng bằng đánh số (1., 2., 3.) và dấu chấm tròn (•), tuyệt đối không dùng ký tự # hay *.`;

    const recentHistory = (messages || [])
      .slice(-4)
      .map(
        (m: any) =>
          `${m.role === 'user' ? 'Người hỏi' : 'Bác sĩ AI'}: ${String(m.content || '').slice(0, 1200)}`
      )
      .join('\n\n');

    const contentsText = hasImage
      ? `YÊU CẦU CỦA NGƯỜI DÙNG: "${lastUserMessage}"${
          recentHistory && !isGenericImageQuery ? `\n\nNGỮ CẢNH GẦN ĐÂY:\n${recentHistory}` : ''
        }${
          ragContext ? `\n\nTÀI LIỆU THAM KHẢO:\n${ragContext}` : ''
        }\n\nHãy đọc kỹ toàn bộ ${imageParts.length} hình ảnh đính kèm, liệt kê đầy đủ dữ liệu đọc được và trả lời trực diện, chuẩn xác (trình bày sạch sẽ không #, không *).`
      : `LỊCH SỬ HỘI THOẠI GẦN ĐÂY:\n${recentHistory}\n\n[TỪ ĐIỂN DỮ LIỆU THAM KHẢO TÙY CHỌN — CHỈ DÙNG MỤC KHỚP TRỰC TIẾP VỚI CÂU HỎI, BỎ QUA MỤC KHÔNG LIÊN QUAN]:\n${ragContext}\n\nCÂU HỎI HIỆN TẠI CẦN TRẢ LỜI CHÍNH XÁC TỪNG CÂU CHỮ: "${lastUserMessage}"\n\nHãy trả lời trực diện, đúng 100% trọng tâm câu hỏi trên, không trả lời lan man sang bệnh khác (trình bày sạch sẽ không #, không *).`;

    const requestContents = hasImage
      ? {
          parts: [...imageParts, { text: contentsText }],
        }
      : contentsText;

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: requestContents,
        config: {
          systemInstruction: systemPrompt,
        },
      },
      hasImage ? 50000 : 38000,
      ThinkingLevel.LOW,
      hasImage
    );

    const replyText = cleanMedicalText(response?.text || '');
    if (replyText.trim()) {
      return { status: 200, payload: { reply: replyText, source: 'gemini' } };
    }

    if (hasImage) {
      return {
        status: 502,
        payload: {
          error: 'Không nhận được nội dung phân tích từ hình ảnh. Vui lòng chụp rõ nét hơn và thử lại.',
        },
      };
    }

    const fallbackReply = generateClinicalConsultationAnswer(
      contextualRetrievalQuery,
      messages
    );
    return { status: 200, payload: { reply: fallbackReply, source: 'knowledge_vault' } };
  } catch (error: any) {
    console.warn('Chat API switched to scientific knowledge engine:', error?.message || error);
    if (hasImage) {
      const errMsg = String(error?.message || error || '').toLowerCase();
      let friendlyError =
        'Không thể phân tích hình ảnh lúc này. Vui lòng kiểm tra kết nối hoặc thử tải lại ảnh rõ nét hơn.';
      if (errMsg.includes('api key') || errMsg.includes('403') || errMsg.includes('permission_denied') || errMsg.includes('400')) {
        friendlyError =
          'GEMINI_API_KEY trên máy chủ chưa hợp lệ hoặc chưa được kích hoạt quyền Gemini Vision. Vui lòng kiểm tra biến môi trường trên Vercel rồi Redeploy.';
      } else if (errMsg.includes('429') || errMsg.includes('resource_exhausted') || errMsg.includes('quota')) {
        friendlyError =
          'GEMINI_API_KEY hiện đang vượt giới hạn lượt gọi (Quota 429). Vui lòng thử lại sau vài chục giây hoặc nâng cấp gói API Key.';
      } else if (errMsg.includes('timeout')) {
        friendlyError =
          'Quá trình đọc ảnh bị quá thời gian phản hồi từ AI. Vui lòng gửi 1 ảnh rõ nét mỗi lượt hoặc thử lại ngay.';
      }
      return {
        status: 500,
        payload: {
          error: friendlyError,
        },
      };
    }
    const fallbackReply = generateClinicalConsultationAnswer(
      contextualRetrievalQuery,
      messages
    );
    return { status: 200, payload: { reply: fallbackReply, source: 'knowledge_vault' } };
  }
}

export async function handleAskLibraryRequest(body: any): Promise<{ status: number; payload: any }> {
  const { query, bookId } = body || {};
  const q = query || '';
  const ragContext = buildScientificRagContext(q, bookId);

  try {
    const ai = getGeminiClient();
    if (!ai) {
      const answer = generateClinicalConsultationAnswer(q, undefined, bookId);
      return { status: 200, payload: { answer, source: 'knowledge_vault' } };
    }

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: `Tra cứu chuyên sâu trong kho 82+ Y điển Đông - Tây Y (Trọng tâm sách đang chọn: ${bookId || 'Toàn bộ thư viện Y Đạo Toàn Thư'}).
[TỪ ĐIỂN DỮ LIỆU THAM KHẢO TÙY CHỌN — CHỈ DÙNG MỤC KHỚP TRỰC TIẾP VỚI CÂU HỎI]:
${ragContext}
CÂU HỎI NGUYÊN VĂN CỦA NGƯỜI DÙNG: "${q}"

YÊU CẦU BẮT BUỘC: Hãy bám sát 100% từng câu chữ của câu hỏi trên để trả lời trúng đích (TUYỆT ĐỐI KHÔNG dùng dấu # hay dấu *, không chèn link URL):
1. Trả lời trực tiếp đúng từng ý của câu hỏi & Luận điểm cốt lõi từ tác phẩm y điển liên quan
2. Cơ chế giải phẫu / Sinh lý bệnh / Dược lý phân tử hoặc Biện chứng Tạng phủ - Lục kinh chính xác
3. Ứng dụng thực tế (huyệt vị / bài thuốc gram chuẩn / phác đồ thuốc Tây Y nếu câu hỏi đề cập)
4. Đối chiếu Đông - Nam - Tây Y và lưu ý an toàn lâm sàng.`,
        config: {
          systemInstruction: MASTER_MEDICAL_PROMPT,
        },
      },
      38000,
      ThinkingLevel.LOW
    );

    const answer = cleanMedicalText(response?.text || '');
    if (answer.trim()) {
      return { status: 200, payload: { answer, source: 'gemini' } };
    }

    return {
      status: 200,
      payload: {
        answer: generateClinicalConsultationAnswer(q, undefined, bookId),
        source: 'knowledge_vault',
      },
    };
  } catch (error: any) {
    console.warn('Ask Library switched to scientific knowledge engine:', error?.message || error);
    return {
      status: 200,
      payload: {
        answer: generateClinicalConsultationAnswer(q, undefined, bookId),
        source: 'knowledge_vault',
      },
    };
  }
}

export async function handleCheckInteractionsRequest(body: any): Promise<{ status: number; payload: any }> {
  try {
    const { herbs, drugs } = body || {};
    const herbList = Array.isArray(herbs) ? herbs : [];
    const drugList = Array.isArray(drugs) ? drugs : [];

    const promptText = `HỘI CHẨN TƯƠNG TÁC DƯỢC LÝ ĐÔNG - TÂY Y (Dược Thư Quốc Gia, Stockley, DiPiro & Dan Bensky):
Danh sách thảo dược Đông y: ${JSON.stringify(herbList)}
Danh sách thuốc Tây y: ${JSON.stringify(drugList)}

Hãy phân tích toàn diện:
1. Cảnh báo nguy cơ xuất huyết, độc tính gan thận, hạ kali máu hoặc tạo phức chelat (nếu có).
2. Tác động lên men gan Cytochrome P450 (CYP3A4, CYP2C9, CYP2C19) và chuyển hóa thuốc.
3. Các tương tác hiệp đồng có lợi (Synergy) giúp nâng cao hiệu quả hoặc giảm tác dụng phụ.
4. Lời khuyên cụ thể về giãn cách thời gian uống (Quy tắc 1.5 - 2 giờ) và chỉ số xét nghiệm cần theo dõi.`;

    const ai = getGeminiClient();
    if (!ai) {
      return {
        status: 200,
        payload: {
          success: true,
          summary: 'Phân tích từ Dược thư Quốc gia Việt Nam & Stockley',
          guidance:
            'Khuyến cáo uống thuốc Đông y cách thuốc Tây y tối thiểu 1.5 - 2 giờ để tránh tương tác cơ học và chelat hóa tại dạ dày.',
          source: 'knowledge_vault',
        },
      };
    }

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: promptText,
        config: {
          systemInstruction: MASTER_MEDICAL_PROMPT,
        },
      },
      35000,
      ThinkingLevel.LOW
    );

    return {
      status: 200,
      payload: {
        success: true,
        analysis: cleanMedicalText(response?.text || ''),
        source: 'gemini',
      },
    };
  } catch {
    return {
      status: 200,
      payload: {
        success: true,
        guidance:
          'Khuyến cáo uống thuốc Đông y cách thuốc Tây y tối thiểu 1.5 - 2 giờ để tránh tương tác hấp thu tại ruột non.',
        source: 'knowledge_vault',
      },
    };
  }
}
