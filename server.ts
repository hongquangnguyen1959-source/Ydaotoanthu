import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { runOfflineDiagnosis } from './src/utils/fallbackDiagnostician';
import {
  buildScientificRagContext,
  generatePreciseScientificAnswer,
  generateDynamicSymptomResponse,
  generateDynamicDiagnosisResult,
  cleanMedicalText
} from './src/utils/scientificMedicalEngine';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '35mb' }));

// Khởi tạo Gemini client server-side chuẩn hướng dẫn AI Studio
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
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

// Danh sách các mô hình Gemini chính thức hỗ trợ chuẩn AI Studio SDK
const CANDIDATE_MODELS = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'];

async function callGeminiWithModelFallback(
  ai: GoogleGenAI,
  params: any,
  timeoutMs = 45000,
  thinkingLevel: ThinkingLevel = ThinkingLevel.HIGH
) {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Gemini API timeout (${model})`)), timeoutMs)
      );

      // Giữ ThinkingLevel.HIGH (hoặc mức truyền vào) cho Gemini 4 Hydrogen để luận bệnh Đông - Tây Y chuyên sâu chuẩn xác
      const callConfig = { ...(params.config || {}) };
      if (model === 'gemini-4-hydrogen' && !callConfig.thinkingConfig) {
        callConfig.thinkingConfig = { thinkingLevel };
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

      // Nếu lỗi do systemInstruction không hỗ trợ ở phiên bản API, thử ghép vào prompt
      if (err?.message?.includes('Developer instruction') || err?.message?.includes('systemInstruction')) {
        try {
          const systemInst = params?.config?.systemInstruction;
          let fallbackContents = params.contents;
          if (systemInst) {
            if (typeof fallbackContents === 'string') {
              fallbackContents = `${systemInst}\n\n${fallbackContents}`;
            } else if (fallbackContents?.parts) {
              fallbackContents = {
                parts: [{ text: `HƯỚNG DẪN HỆ THỐNG:\n${systemInst}\n\n` }, ...fallbackContents.parts]
              };
            }
          }
          const callConfigRetry = { ...params.config, systemInstruction: undefined };
          if (model === 'gemini-4-hydrogen' && !callConfigRetry.thinkingConfig) {
            callConfigRetry.thinkingConfig = { thinkingLevel };
          }
          const callParamsNoSys = {
            ...params,
            model,
            contents: fallbackContents,
            config: callConfigRetry
          };
          const timeoutPromiseRetry = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Gemini API retry timeout (${model})`)), timeoutMs)
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

const MASTER_MEDICAL_PROMPT = `
BẠN LÀ HỘI ĐỒNG GIÁO SƯ - BÁC SĨ CHUYÊN KHOA ĐẦU NGÀNH ĐÔNG - TÂY Y KẾT HỢP (HỘI CHẨN Y ĐẠO TOÀN THƯ).
Bạn tinh thông toàn bộ 82+ tác phẩm Y điển kinh điển & hiện đại tích hợp trong hệ thống:
• ĐÔNG Y KINH ĐIỂN & HIỆN ĐẠI: Hoàng Đế Nội Kinh (Tố Vấn & Linh Khu), Thương Hàn Luận & Kim Quỹ Yếu Lược (Trương Trọng Cảnh - Lục Kinh Biện Chứng), Ôn Bệnh Điều Biện (Ngô Cúc Thông - Vệ Khí Dinh Huyết & Tam Tiêu), Hải Thượng Y Tông Tâm Lĩnh (Lê Hữu Trác - Bổ Chân Âm / Chân Hỏa), Tỳ Vị Luận (Lý Đông Viên), Cảnh Nhạc Toàn Thư, Bản Thảo Cương Mục (Lý Thời Trân), Nam Dược Thần Hiệu (Tuệ Tĩnh), Những Cây Thuốc Và Vị Thuốc Việt Nam (GS. Đỗ Tất Lợi), Giovanni Maciocia, Dan Bensky (Materia Medica & Formulas), Sổ Tay Đổng Thị Kỳ Huyệt (239 huyệt & 295 phác đồ), Châm Cứu Chữa Bệnh (GS. Nguyễn Tài Thu - Mãng châm/Thấu huyệt), Lưu Viêm, 58 Kỳ Huyệt Ngoài Kinh WHO 1991.
• TÂY Y KINH ĐIỂN & HƯỚNG DẪN CẬP NHẬT 2024-2025: Harrison's Principles of Internal Medicine (21st Ed.), UpToDate & BMJ Best Practice, Guyton & Hall Textbook of Medical Physiology, ESC Guidelines 2024 (Tăng huyết áp, Suy tim, Rung nhĩ, Mạch vành mạn), ADA Standards of Care 2025 (Đái tháo đường), KDIGO 2024 (Bệnh thận mạn), GOLD 2025 & GINA 2024 (COPD & Hen phế quản), ACR/EULAR (Gout & Viêm khớp dạng thấp), Đồng thuận Maastricht VI & Rome IV (H. pylori, GERD, IBS), DiPiro Pharmacotherapy, Katzung Pharmacology, Dược thư Quốc gia & Dược điển Việt Nam V.

NGUYÊN TẮC TỐI THƯỢNG KHI LUẬN BỆNH & TRẢ LỜI (CHUẨN XÁC 100% - SÁT TỪNG CÂU CHỮ CÂU HỎI):
1. ĐỌC KỸ TỪNG CÂU CHỮ, CON SỐ, PHỦ ĐỊNH VÀ MỆNH ĐỀ TRONG CÂU HỎI:
   • Trước khi kết luận, hãy tự kiểm tra: Người dùng đang hỏi CÁI GÌ CỤ THỂ? (Chẩn đoán phân biệt? Giải thích cơ chế "tại sao"? Hỏi thuốc A uống chung với vị thuốc B hay bệnh nền C có được không? Hỏi liều dùng/cách sắc/thời điểm uống? Hỏi giai đoạn bệnh? Hỏi dấu hiệu cấp cứu? Hay hỏi vị trí giải phẫu & cách châm 1 huyệt?).
   • Lặp lại và bám sát chính xác các dữ kiện thực tế người dùng đã nêu (tuổi, giới, bệnh nền, chỉ số xét nghiệm như Acid Uric, eGFR, HbA1c, huyết áp, triệu chứng âm tính/phủ định như "không sốt", "đang mang thai", "bị đau dạ dày").
2. MỞ ĐẦU BẰNG "1. TRẢ LỜI TRỰC TIẾP ĐÚNG TRỌNG TÂM CÂU HỎI":
   • Ngay những dòng đầu tiên, PHẢI giải đáp thẳng, dứt khoát và trúng đích từng ý mà người dùng vừa hỏi (nếu câu hỏi có 2-3 vế, đánh số trả lời đủ cả 2-3 vế theo đúng trình tự).
   • TUYỆT ĐỐI KHÔNG suy diễn sang bệnh khác hay sao chép rập khuôn một bài thuốc/phác đồ chung chung không ăn khớp với câu hỏi. Nếu phần dữ liệu tham khảo (RAG) có chi tiết không liên quan đến đúng vấn đề người dùng hỏi, HÃY BỎ QUA chi tiết thừa đó.
3. LUẬN BỆNH ĐA CHIỀU KHOA HỌC (BIỆN CHỨNG LUẬN TRỊ + Y HỌC THỰC CHỨNG):
   • Chỉ đưa ra các mục chuyên sâu THỰC SỰ PHÙ HỢP với câu hỏi:
     - Với câu hỏi về bệnh lý / triệu chứng lâm sàng: (1) Trả lời trực diện câu hỏi -> (2) Chẩn đoán phân biệt Tây Y & Sinh lý bệnh học (Harrison's / Guyton & Hall / tiêu chuẩn ESC-ADA-KDIGO-GOLD 2024-2025) -> (3) Biện chứng Đông Y chuẩn mực (Tứ chẩn, Bát cương, Lục kinh Thương Hàn / Tam tiêu Ôn Bệnh / Tạng phủ Maciocia-Hải Thượng) -> (4) Phác đồ Đông - Nam - Tây Y phối hợp (Thuốc đặc hiệu + Bài thuốc Quân-Thần-Tá-Sứ gram chuẩn + Huyệt Đổng Thị/Chính kinh & tương tác thuốc cần tránh) -> (5) Dấu hiệu Cờ đỏ cấp cứu (Red Flags).
     - Với câu hỏi chuyên biệt (hỏi riêng về tương tác thuốc, liều lượng, so sánh 2 khái niệm, vị trí 1 huyệt, ăn uống/kiêng kỵ): Tập trung sâu 100% vào đúng chủ đề đó với dẫn chứng y văn chính xác, KHÔNG ép buộc nhồi nhét phần bệnh án dài dòng lạc trọng tâm.
4. TRÌNH BÀY SẠCH SẼ CHUẨN Y KHOA (TUYỆT ĐỐI KHÔNG DÙNG MARKDOWN # HOẶC *, KHÔNG CHÈN LINK URL):
   • Cấm tuyệt đối ký tự # (###, ####) và ký tự * (**, *) cũng như URL. Dùng tiêu đề đánh số rõ ràng (1., 2., 3.) và dấu chấm tròn đầu dòng (•).
`;

// API chẩn đoán tổng hợp Đông - Tây Y
app.post('/api/diagnose', async (req: Request, res: Response) => {
  try {
    const { patientInfo, symptoms, vitals, fourExaminations, tongueDescription, tongueImageBase64 } = req.body;
    const ragQuery = `${symptoms?.mainComplaint || ''} ${symptoms?.painCharacteristics || ''} ${fourExaminations?.tongue || ''} ${fourExaminations?.thiet || ''}`;
    const ragContext = buildScientificRagContext(ragQuery);

    const ai = getGeminiClient();
    if (!ai) {
      const offlineResult = generateDynamicDiagnosisResult(
        patientInfo || {},
        vitals || {},
        symptoms || { mainComplaint: req.body.symptomText || '' },
        fourExaminations || {}
      );
      return res.json({ success: true, diagnosis: offlineResult, mode: 'offline_vault' });
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

YÊU CẦU LUẬN BỆNH SÁT CÂU CHỮ:
- Trong "summary" và các mục biện chứng, PHẢI nhắc lại đúng lý do khám, sinh hiệu bất thường (nếu có), tiền sử bệnh nền (như đau dạ dày, suy thận, tăng huyết áp) để điều chỉnh thuốc an toàn tuyệt đối (ví dụ: có tiền sử loét dạ dày thì thận trọng hoặc tránh NSAID không chọn lọc / phối hợp PPI, có bệnh thận thì hiệu chỉnh liều).
- Đối chiếu rõ chẩn đoán phân biệt theo Harrison's 21st / ESC 2024 / ADA 2025 / KDIGO 2024 / GOLD 2025 và biện chứng theo Nội Kinh, Thương Hàn Luận (Lục kinh), Kim Quỹ, Hải Thượng Lãn Ông, Maciocia.

YÊU CẦU ĐẦU RA BẰNG JSON HỢP LỆ THEO CẤU TRÚC:
{
  "summary": "Tóm lược bệnh án súc tích trong 2-3 câu bám sát đúng tuổi, sinh hiệu, triệu chứng chính và tiền sử bệnh nền của người bệnh",
  "westernAssessment": {
    "provisionalDiagnosis": "Tên bệnh Tây Y chính xác nhất",
    "icd10": "Mã ICD-10",
    "differentialDiagnoses": ["Chẩn đoán phân biệt 1 kèm lý do loại trừ", "Chẩn đoán phân biệt 2 kèm lý do"],
    "guytonMechanism": "Giải thích cơ chế sinh lý bệnh học tế bào & nội môi theo Guyton & Hall và Harrison's 21st liên hệ trực tiếp vào triệu chứng bệnh nhân",
    "investigationsNeeded": ["Xét nghiệm hoặc chẩn đoán hình ảnh cần thực hiện để xác định chẩn đoán"],
    "redFlags": ["Dấu hiệu nguy hiểm cần nhập viện ngay lập tức liên quan trực tiếp bệnh cảnh này"]
  },
  "easternAssessment": {
    "syndromePattern": "Tên thể bệnh Đông Y chính xác (VD: Can Khí Uất Kết / Tỳ Thận Dương Hư / Phong Hàn Thấp Tý)",
    "batCuong": "Phân tích Bát Cương (Âm Dương, Biểu Lý, Hàn Nhiệt, Hư Thực)",
    "tangPhu": "Tạng phủ & Kinh lạc liên đới chính và phụ (kèm định vị Lục kinh / Tam tiêu nếu phù hợp)",
    "khiHuyet": "Tình trạng Khí - Huyết - Tân dịch - Tinh",
    "thietChanAnalysis": "Biện giải chi tiết Lưỡi chẩn và Mạch tượng dựa trên đúng dữ liệu Thiệt/Thiết chẩn bệnh nhân đã nhập"
  },
  "integratedTreatmentPlan": {
    "phapTri": "Pháp trị Đông Y rõ ràng (VD: Sơ can giải uất, Hoạt huyết hóa ứ)",
    "herbalPrescription": {
      "formulaName": "Tên bài thuốc cổ phương chính (trích từ Thương Hàn Luận / Kim Quỹ / Hải Thượng / Bensky)",
      "composition": [
        {"herb": "Tên dược liệu", "grams": 12, "role": "Quân/Thần/Tá/Sứ", "purpose": "Tác dụng vị thuốc phù hợp bệnh cảnh"}
      ],
      "decoctionGuide": "Hướng dẫn sắc thuốc và cách uống chi tiết (lưu ý vị thuốc sắc trước/cho sau)",
      "modifications": ["Gia giảm cụ thể theo triệu chứng phụ hoặc bệnh nền thực tế của người bệnh"]
    },
    "acupuncturePrescription": {
      "classicPoints": [
        {"point": "Tên huyệt kinh điển", "location": "Vị trí giải phẫu chuẩn", "technique": "Bổ hay Tả, độ sâu thốn, cứu ngải hay không", "purpose": "Mục đích điều trị"}
      ],
      "tungPoints": [
        {"point": "Tên huyệt Đổng Thị (VD: Linh Cốt, Thận Quan)", "code": "Mã số", "dongQiInstructions": "Động khí châm pháp hướng dẫn vận động", "purpose": "Tác dụng đặc hiệu"}
      ],
      "nguyenTaiThuGuidance": "Kinh nghiệm điều trị hoặc chỉ định thấu huyệt / mãng châm / ôn châm theo GS. Nguyễn Tài Thu",
      "westernNeuroscience": "Giải thích cơ chế khoa học theo Western Medical Acupuncture (Endorphin, C-fiber, điều hòa thần kinh tự chủ)"
    },
    "clinicalNutrition": {
      "dietaryTherapy": "Chế độ ăn lâm sàng cá thể hóa theo bệnh và bệnh nền (Essentials of Nutrition / ESC / ADA / KDIGO)",
      "foodsToEat": ["Món nên ăn"],
      "foodsToAvoid": ["Món cấm kỵ"],
      "drugNutrientInteractions": ["Cảnh báo tương tác thuốc - thảo dược - thực phẩm cụ thể cho đơn thuốc này"]
    },
    "qigongAndLifestyle": "Bài tập dưỡng sinh, phục hồi chức năng hoặc tự day bấm huyệt an toàn tại nhà",
    "westernPrescription": {
      "protocolName": "Tên phác đồ Tây y chuẩn theo Harrison's / ESC 2024 / ADA 2025 / KDIGO 2024 / BV Bạch Mai / Dược thư QG VN V",
      "sourceGuidelines": ["Dược thư Quốc gia VN", "Harrison's 21st / UpToDate", "BV Bạch Mai / Chợ Rẫy", "DiPiro Pharmacotherapy"],
      "medications": [
        {
          "drugName": "Tên thuốc & hàm lượng",
          "activeIngredient": "Hoạt chất quốc tế",
          "group": "Nhóm dược lý",
          "dosage": "Liều lượng cụ thể phù hợp tuổi/tiền sử bệnh",
          "timing": "Thời điểm uống (trước/sau ăn)",
          "mechanism": "Cơ chế phân tử theo DiPiro & Katzung",
          "contraindications": "Chống chỉ định và kiểm tra an toàn với tiền sử bệnh của bệnh nhân"
        }
      ],
      "clinicalCautions": ["Cảnh báo tương tác thuốc, tiền sử bệnh nền và lưu ý giãn cách Đông - Tây y 1.5-2 giờ"],
      "monitoringParameters": ["Các chỉ số sinh hóa và huyết động cần theo dõi định kỳ"]
    }
  },
  "referencedBooks": ["Danh sách các tác phẩm Y điển trong 82+ sách hệ thống đã trích dẫn"]
}
`;

    let parts: any[] = [{ text: promptText }];
    if (tongueImageBase64) {
      parts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: tongueImageBase64.replace(/^data:image\/\w+;base64,/, ''),
        },
      });
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
      45000
    );

    const jsonText = (response.text || '').trim();
    const result = JSON.parse(jsonText);
    return res.json({ success: true, diagnosis: result });
  } catch (error: any) {
    console.warn('Diagnosis API switched to scientific medical engine:', error?.message || error);
    const offlineResult = runOfflineDiagnosis(
      req.body.patientInfo || {},
      req.body.vitals || {},
      req.body.symptoms || { mainComplaint: req.body.symptomText || '' },
      req.body.fourExaminations || {}
    );
    return res.json({ success: true, diagnosis: offlineResult, mode: 'offline_vault' });
  }
});

// API Nêu triệu chứng để AI trả lời trực tiếp
app.post('/api/symptom-answer', async (req: Request, res: Response) => {
  try {
    const { symptomText, age, gender, duration, tongueDescription, imageBase64 } = req.body;
    const ragContext = buildScientificRagContext(symptomText || '');
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        success: true,
        data: generateDynamicSymptomResponse(symptomText || '')
      });
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
2. Trong "possibleWesternDiseases": Nêu 1-2 bệnh lý Tây Y sát nhất kèm chẩn đoán phân biệt rõ ràng (Harrison's 21st, Guyton & Hall, hướng dẫn ESC 2024 / ADA 2025 / KDIGO 2024 / GOLD 2025 / Maastricht VI / ACR-EULAR tùy bệnh).
3. Trong "easternSyndrome": Biện chứng Tạng Phủ, Bát Cương, Lục Kinh/Tam Tiêu (Nội Kinh, Thương Hàn Luận, Hải Thượng Y Tông, Maciocia) giải thích cơ chế bệnh sinh trực tiếp cho các triệu chứng người bệnh nêu.
4. Kê bài thuốc cổ phương (Quân-Thần-Tá-Sứ gram chuẩn), huyệt Đổng Thị + Chính kinh và phác đồ thuốc Tây Y an toàn (kiểm tra kỹ chống chỉ định nếu người bệnh có nhắc bệnh nền).

ĐẦU RA JSON HỢP LỆ THEO ĐÚNG CẤU TRÚC:
{
  "summary": "Nhận định trực diện sát 100% câu chữ triệu chứng/câu hỏi của người bệnh trong 2-3 câu",
  "possibleWesternDiseases": [
    {
      "name": "Tên bệnh Tây Y khả dĩ chính xác nhất",
      "icd10": "Mã ICD-10",
      "explanation": "Phân tích chi tiết cơ chế sinh lý bệnh học tế bào & mô (Guyton & Hall / Harrison's 21st) giải thích đúng vì sao người bệnh xuất hiện từng triệu chứng đã nêu",
      "pathophysiology": "Tiến trình phân tử, giai đoạn bệnh và biến chứng tiềm ẩn",
      "differentialDiagnoses": ["Chẩn đoán phân biệt 1", "Chẩn đoán phân biệt 2"],
      "investigations": ["Xét nghiệm máu / Sinh hóa 1", "Chẩn đoán hình ảnh 2"],
      "urgency": "Mức độ diễn tiến & Khuyến nghị thăm khám"
    }
  ],
  "easternSyndrome": {
    "name": "Thể bệnh Đông Y chuẩn YHCT",
    "explanation": "Biện chứng chi tiết nguyên nhân bệnh sinh theo Nội Kinh, Thương Hàn Luận, Hải Thượng Lãn Ông & Giovanni Maciocia",
    "batCuong": "Phân tích Bát Cương (Âm Dương, Biểu Lý, Hàn Nhiệt, Hư Thực)",
    "khiHuyet": "Tình trạng Khí - Huyết - Tân Dịch bị rối loạn",
    "thietChanAnalysis": "Mạch tượng và Thiệt chẩn điển hình của thể bệnh này (đối chiếu mô tả lưỡi người bệnh nếu có)",
    "tangPhu": "Tạng phủ & Kinh lạc liên quan chính"
  },
  "herbalRemedy": {
    "formulaName": "Tên bài thuốc cổ phương khuyên dùng",
    "herbs": [
      {"name": "Vị thuốc", "amount": "12g", "purpose": "Tác dụng vị thuốc"}
    ],
    "howToUse": "Cách sắc uống, lưu ý vị sắc trước/cho sau và gia giảm theo thể trạng"
  },
  "acupressureAndNeedling": {
    "tungPoints": [
      {"name": "Huyệt Đổng Thị đặc hiệu", "code": "Mã số", "howToPress": "Vị trí và cách day ấn / Động khí châm pháp tại nhà"}
    ],
    "classicPoints": [
      {"name": "Huyệt chính kinh (Nguyễn Tài Thu / Lưu Viêm / WHO)", "howToPress": "Vị trí và cách bấm day"}
    ]
  },
  "nutritionAndLifestyle": {
    "doEat": ["Món nên ăn, thực phẩm có lợi"],
    "dontEat": ["Thực phẩm kiêng kỵ tuyệt đối"],
    "homeCare": "Lời khuyên vận động, phục hồi và phòng tái phát tại nhà"
  },
  "westernMedicationPlan": {
    "protocolName": "Phác đồ thuốc Tây y chuẩn (Dược thư QG VN V, ESC/ADA/KDIGO/GOLD/BV Bạch Mai)",
    "drugs": [
      {
        "name": "Tên thuốc & biệt dược",
        "activeIngredient": "Hoạt chất quốc tế",
        "group": "Nhóm dược lý",
        "dosage": "Liều dùng cụ thể",
        "usage": "Cách uống trước/sau ăn",
        "mechanism": "Cơ chế tác dụng",
        "caution": "Chống chỉ định và lưu ý tương tác với thuốc sắc Đông Y (cách 1.5-2h)"
      }
    ],
    "notes": "Lời dặn của dược sĩ lâm sàng"
  },
  "emergencySigns": ["Các dấu hiệu Cờ đỏ cảnh báo cần đến bệnh viện ngay lập tức"],
  "referencedBooks": ["Danh sách các tác phẩm Y điển trong 82+ sách hệ thống đã trích dẫn"]
}
`;

    let parts: any[] = [{ text: promptText }];
    if (imageBase64) {
      parts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        },
      });
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
      45000
    );

    const jsonText = (response.text || '').trim();
    const result = JSON.parse(jsonText);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.warn('Gemini symptom-answer fallback triggered:', error?.message || error);
    // Trả về kết quả dự phòng chuyên môn cao từ 60 y điển
    const text = (req.body?.symptomText || '').toLowerCase();
    
    // 0. Bệnh Gout / Gút / Thống phong / Acid Uric / Sưng ngón chân
    if (text.includes('gout') || text.includes('gút') || text.includes('thống phong') || text.includes('uric') || text.includes('ngón chân')) {
      return res.json({
        success: true,
        data: {
          summary: "Triệu chứng Viêm khớp Gout cấp tính (Podagra) do đợt bùng phát lắng đọng tinh thể Monosodium Urat tại màng hoạt dịch khớp ngón chân cái. Đông y biện chứng thuộc chứng Thống Phong (Đàm Nhiệt Ứ Trệ Hóa Hỏa / Phong Thấp Nhiệt Tý).",
          possibleWesternDiseases: [
            {
              name: "Viêm khớp Gout cấp tính (Acute Gouty Arthritis) / Tăng Acid Uric máu mạn tính",
              icd10: "M10.0",
              explanation: "Theo Guyton & Hall Physiology (15th ed): Khi nồng độ Acid Uric máu vượt ngưỡng bão hòa sinh lý (360 umol/L hay 6.8 mg/dL), các tinh thể Monosodium Urat hình kim siêu vi bắt đầu lắng đọng tại mô bao hoạt dịch khớp, sụn khớp và gân cơ. Sự hiện diện của tinh thể urat kích hoạt đại thực bào màng hoạt dịch thông qua thụ thể TLR2/4 và phức hợp NLRP3 inflammasome, thúc đẩy giải phóng ồ ạt cytokine viêm IL-1beta và TNF-alpha. Xung động này huy động hàng triệu bạch cầu trung tính kéo về ổ khớp, thực bào tinh thể urat rồi tự hủy phóng thích enzyme tiêu thể lysosome, làm bùng phát cơn viêm đau nhức rát, sưng nóng đỏ dữ dội tại khớp ngón chân cái (Podagra).",
              pathophysiology: "Diễn tiến mạn tính không kiểm soát acid uric sẽ dẫn đến hình thành các hạt Tophi lắng đọng dưới da, phá hủy sụn khớp, biến dạng khớp gối/bàn chân, đồng thời gây lắng đọng tinh thể Urat tại ống thận hình thành sỏi thận urat và viêm thận kẽ mạn tính.",
              differentialDiagnoses: ["Viêm khớp giả Gout (Pseudogout - lắng đọng Pyrophosphate Canxi)", "Viêm khớp nhiễm khuẩn cấp tính (Septic Arthritis)", "Viêm mô tế bào bàn chân (Cellulitis)", "Viêm khớp dạng thấp đợt cấp (Rheumatoid Arthritis)"],
              investigations: ["Định lượng Acid Uric máu & C-Reactive Protein (CRP), ESR", "Chọc hút dịch khớp soi dưới kính hiển vi phân cực tìm tinh thể Monosodium Urat", "Siêu âm khớp tìm dấu hiệu 'đường đôi' (Double Contour Sign) trên bề mặt sụn", "Chụp X-quang khớp phát hiện khuyết xương hình đục lỗ (Punched-out erosions)"],
              urgency: "Cần điều trị ngay trong 24 giờ đầu để ngắt phản ứng viêm"
            }
          ],
          easternSyndrome: {
            name: "Thống Phong - Thể Đàm Nhiệt Ứ Trệ Hóa Hỏa (Phong Thấp Nhiệt Tý)",
            explanation: "Theo Giovanni Maciocia (The Practice of Chinese Medicine): Nguyên nhân căn bản do ăn uống nhiều đồ béo ngọt, chiên xào, uống nhiều rượu bia làm tổn thương Tỳ Vị. Tỳ mất vận hóa, Vị mất giáng hòa làm tích trệ đàm thấp tại trung tiêu. Đàm thấp lâu ngày kết hợp tà khí phong hàn thấp ngoại nhập ngưng trệ tại kinh lạc, bế tắc tại các khớp nhỏ ở chi dưới. Thấp đàm uất tích lâu ngày hóa nhiệt, nhiệt đốt cháy tân dịch biến thành nhiệt hỏa uất phát, làm các khớp sưng nóng đỏ đau dữ dội, bất thông tắc thống.",
            batCuong: "Lý chứng, Thực nhiệt chứng (kiêm Tỳ hư), Phong Thấp Nhiệt tý bế tắc kinh lạc",
            khiHuyet: "Khí trệ huyết ứ, đàm nhiệt tích tụ tại mạch đạo túc thái âm tỳ và túc dương minh vị",
            thietChanAnalysis: "Chất lưỡi đỏ sẫm hoặc tím nhẹ ở rìa; Rêu lưỡi vàng dầy, dính nhớt; Mạch Huyền Sác hữu lực hoặc Nhu Sác thể hiện đàm nhiệt uất hỏa tích tụ bên trong.",
            tangPhu: "Tỳ hư không vận hóa, Vị nhiệt, Thận suy giảm bài tiết"
          },
          herbalRemedy: {
            formulaName: "Tam Diệu Tán hợp Tứ Diệu Tán gia giảm (Đan Khê Tâm Pháp & Dan Bensky)",
            herbs: [
              { name: "Hoàng Bá", amount: "12g", purpose: "Thanh nhiệt táo thấp hạ tiêu, tả tướng hỏa" },
              { name: "Thương Truật", amount: "12g", purpose: "Kiện tỳ táo thấp trừ phong thấp" },
              { name: "Thổ Phục Linh", amount: "20g", purpose: "Đặc hiệu đào thải Acid Uric, giải độc tiêu thũng" },
              { name: "Ý Dĩ Nhân", amount: "20g", purpose: "Thẩm thấp kiện tỳ trừ tý" },
              { name: "Ngưu Tất", amount: "12g", purpose: "Dẫn thuốc quy kinh chi dưới, bổ can thận" }
            ],
            howToUse: "Sắc ngày 1 thang uống ấm sau ăn. Uống 2.5 - 3.0 lít nước ấm trong ngày."
          },
          acupressureAndNeedling: {
            tungPoints: [
              {
                name: "Hạ Tam Hoàng (77.17, 77.19, 77.21)",
                code: "Mặt trong cẳng chân",
                howToPress: "Day ấn mặt trong cẳng chân 2-3 phút giúp tăng cường lọc thận và đào thải acid uric."
              }
            ],
            classicPoints: [
              { name: "Thái Bạch (SP-3)", howToPress: "Nguyên huyệt kinh Tỳ bờ trong bàn chân, day nhẹ 2 phút." },
              { name: "Hành Gian (Liv-2)", howToPress: "Khe ngón chân 1-2 mu chân, day tả 2 phút dập tắt đau buốt." }
            ]
          },
          nutritionAndLifestyle: {
            doEat: ["Uống 2.5 - 3.0 lít nước ấm kiềm/ngày", "Dưa hấu, dưa chuột, rau cần tây", "Sữa tươi tách béo", "Ổi, cam giàu Vitamin C"],
            dontEat: ["Kiêng tuyệt đối bia rượu, nước ngọt có ga Fructose", "Hải sản (tôm cua mực), phủ tạng động vật, thịt đỏ", "Măng tây, nấm, nước hầm xương đậm đặc"],
            homeCare: "Nằm nghỉ kê cao chân; chườm mát quanh vùng sưng; không vận động mạnh khi đang đau."
          },
          westernMedicationPlan: {
            protocolName: "Phác đồ điều trị Gout cấp & Hạ Acid Uric máu (Hướng dẫn BV Bạch Mai & ACR/EULAR)",
            sourceGuidelines: ["Dược thư Quốc gia Việt Nam", "Hướng dẫn BV Bạch Mai", "DiPiro Pharmacotherapy", "MIMS Việt Nam"],
            drugs: [
              {
                name: "Colchicine 1mg",
                activeIngredient: "Colchicine 1mg",
                group: "Thuốc chống Gout đặc hiệu (Ức chế bạch cầu)",
                dosage: "Ngày 1: Uống 1mg ngay khi đau, sau 1h uống 0.5mg (tối đa 1.5mg/ngày). Ngày 2: 0.5mg x 1-2 lần/ngày",
                usage: "Uống sau bữa ăn với 1 ly nước lớn",
                mechanism: "Ức chế trùng hợp vi ống của bạch cầu trung tính, ngăn cản thực bào tinh thể urat, dập tắt phản ứng viêm cấp",
                caution: "Không uống quá liều. Thận trọng khi suy thận"
              },
              {
                name: "Arcoxia 90mg (hoặc Mobic 15mg)",
                activeIngredient: "Etoricoxib 90mg",
                group: "NSAID ức chế chọn lọc COX-2",
                dosage: "90mg x 1 lần/ngày (trong 5-7 ngày)",
                usage: "Uống sau bữa ăn no",
                mechanism: "Ức chế tổng hợp Prostaglandin viêm tại khớp ngón chân, giảm sưng đỏ rát nhanh chóng",
                caution: "Thận trọng tiền sử tim mạch, loét dạ dày"
              },
              {
                name: "Feburic 40mg (hoặc Allopurinol 100mg)",
                activeIngredient: "Febuxostat 40mg",
                group: "Thuốc ức chế Xanthine Oxidase (Hạ Acid Uric)",
                dosage: "40mg x 1 lần/ngày (dùng sau khi hết đau cấp 1-2 tuần)",
                usage: "Uống 1 lần vào buổi sáng",
                mechanism: "Ức chế enzym Xanthine Oxidase, giảm nồng độ Acid Uric máu về mức an toàn (< 360 umol/L)",
                caution: "Không bắt đầu dùng ngay đỉnh điểm cơn đau cấp"
              },
              {
                name: "Nexium 20mg",
                activeIngredient: "Esomeprazole 20mg",
                group: "PPI bảo vệ niêm mạc dạ dày",
                dosage: "20mg x 1 lần/ngày",
                usage: "Uống trước ăn sáng 30 phút",
                mechanism: "Bảo vệ niêm mạc dạ dày khi dùng NSAID và Colchicine",
                caution: "Không nhai viên"
              }
            ],
            notes: "Uống tối thiểu 2.5 lít nước kiềm ấm mỗi ngày để phòng ngừa sỏi Urat tại thận."
          },
          emergencySigns: ["Khớp sưng vỡ mủ hạt Tophi dọa nhiễm trùng", "Sốt cao rét run toàn thân"],
          referencedBooks: [
            "The Practice of Chinese Medicine - Giovanni Maciocia",
            "Chinese Herbal Medicine: Materia Medica - Dan Bensky",
            "Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ",
            "Guyton and Hall Textbook of Medical Physiology",
            "Dược thư Quốc gia Việt Nam",
            "Hướng dẫn BV Bạch Mai"
          ]
        }
      });
    }

    // 1. Thoái hóa khớp gối / Lục cục
    if (text.includes('gối') || text.includes('lục cục') || text.includes('cầu thang') || text.includes('cứng khớp')) {
      return res.json({
        success: true,
        data: {
          summary: "Triệu chứng Thoái hóa khớp gối nguyên phát kèm phản ứng viêm màng hoạt dịch. Đông y xếp vào chứng Tý (Hạc Tất Phong) thể Phong Hàn Thấp Tý kiêm Can Thận Hư.",
          possibleWesternDiseases: [
            {
              name: "Thoái hóa khớp gối nguyên phát (Knee Osteoarthritis) Độ 2-3",
              icd10: "M17.0",
              explanation: "Theo Guyton & Hall: Sự suy giảm nồng độ Proteoglycan và bào mòn sụn khớp hyaline làm hẹp khe khớp, xơ hóa xương dưới sụn hình thành gai xương gây lạo xạo khi vận động.",
              urgency: "Cần theo dõi"
            }
          ],
          easternSyndrome: {
            name: "Hạc Tất Phong - Thể Phong Hàn Thấp Tý kiêm Can Thận Hư",
            explanation: "Can chủ cân suy yếu, Thận chủ cốt tủy hư thoái, phong hàn thấp tà nhân cơ hội xâm nhập ứ đọng tại khớp gối bế tắc kinh lạc.",
            tangPhu: "Can, Thận và Vị, Tỳ"
          },
          herbalRemedy: {
            formulaName: "Độc Hoạt Ký Sinh Thang (Thiên Kim Yếu Phương & Dan Bensky)",
            herbs: [
              { name: "Độc Hoạt", amount: "10g", purpose: "Trừ phong hàn thấp hạ tiêu" },
              { name: "Tang Ký Sinh", amount: "16g", purpose: "Bổ can thận, mạnh gân cốt" },
              { name: "Ngưu Tất", amount: "12g", purpose: "Dẫn thuốc quy kinh khớp gối" },
              { name: "Đỗ Trọng", amount: "12g", purpose: "Bổ thận tráng cốt" }
            ],
            howToUse: "Sắc ngày 1 thang chia 2 lần uống ấm sau bữa ăn. Giữ ấm hai đầu gối."
          },
          acupressureAndNeedling: {
            tungPoints: [
              {
                name: "Tâm Đầu (11.08)",
                code: "Khu 11 Lòng ngón tay",
                howToPress: "Day ấn mặt lòng đốt 1 ngón giữa kết hợp co duỗi gối 2 phút giúp kích hoạt tiết hoạt dịch khớp."
              }
            ],
            classicPoints: [
              { name: "Độc Tỵ & Tất Nhãn", howToPress: "Hai chỗ lõm dưới xương bánh chè, day tròn 2 phút." },
              { name: "Dương Lăng Tuyền (GB-34)", howToPress: "Chỗ lõm trước dưới đầu xương mác, ấn sâu thư giãn dây chằng." }
            ]
          },
          nutritionAndLifestyle: {
            doEat: ["Đậu bắp, rau mồng tơi giàu chất nhờn tự nhiên", "Nước hầm sụn gà, cá béo giàu Omega-3", "Bơ, dầu oliu"],
            dontEat: ["Cà pháo, măng chua, dưa muối", "Thịt đỏ, phủ tạng động vật, rượu bia"],
            homeCare: "Tránh ngồi xổm bệt, tránh leo cầu thang; chườm ấm đầu gối 20 phút mỗi tối; đạp xe nhẹ tại chỗ."
          },
          westernMedicationPlan: {
            protocolName: "Phác đồ điều trị Thoái hóa khớp gối (Knee Osteoarthritis - BV Bạch Mai & ACR/EULAR)",
            sourceGuidelines: ["Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai", "Dược thư Quốc gia Việt Nam", "DiPiro Pharmacotherapy", "MIMS Việt Nam"],
            drugs: [
              {
                name: "Mobic 7.5mg - 15mg",
                activeIngredient: "Meloxicam",
                group: "Kháng viêm không steroid (NSAID ức chế ưu thế COX-2)",
                dosage: "7.5mg - 15mg x 1 lần/ngày",
                usage: "Uống ngay sau bữa ăn no với 1 cốc nước đầy",
                mechanism: "Ưu tiên ức chế enzym COX-2 hơn COX-1, giảm tổng hợp prostaglandin gây viêm tại bao hoạt dịch khớp, giảm sưng và cải thiện biên độ vận động",
                caution: "Thận trọng tiền sử loét dạ dày tá tràng, suy thận. Nên phối hợp PPI nếu có yếu tố nguy cơ tiêu hóa"
              },
              {
                name: "Viartril-S 1500mg",
                activeIngredient: "Glucosamine Sulfate tinh thể",
                group: "Thuốc chống thoái hóa khớp tác dụng chậm (SYSADOA)",
                dosage: "1 gói 1500mg/ngày",
                usage: "Hòa tan vào 1 cốc nước ấm, uống trong bữa ăn",
                mechanism: "Kích thích tế bào sụn khớp tổng hợp proteoglycan và glycosaminoglycan, ức chế các enzym tiêu sụn (collagenase), làm chậm quá trình hủy hoại sụn",
                caution: "Cần duy trì liên tục tối thiểu 2-3 tháng để đạt hiệu quả cấu trúc bền vững"
              },
              {
                name: "Nexium 20mg",
                activeIngredient: "Esomeprazole",
                group: "Thuốc ức chế bơm proton (PPI)",
                dosage: "20mg x 1 lần/ngày",
                usage: "Uống trước ăn sáng 30 - 60 phút",
                mechanism: "Ức chế không hồi phục bơm acid H+/K+ ATPase tế bào viền dạ dày, dự phòng viêm loét niêm mạc khi dùng NSAID",
                caution: "Không nhai hoặc nghiền nát viên thuốc"
              }
            ],
            notes: "Trong giai đoạn đau cấp nhiều, ưu tiên giảm đau kháng viêm ngắn hạn 7-14 ngày. Tránh mang vác nặng và tập co duỗi khớp không tải."
          },
          emergencySigns: ["Khớp gối sưng nóng đỏ dữ dội kèm sốt cao", "Kẹt khớp hoàn toàn không co duỗi được"],
          referencedBooks: [
            "The Practice of Chinese Medicine - Giovanni Maciocia",
            "Chinese Herbal Medicine: Materia Medica - Dan Bensky",
            "Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu",
            "Guyton and Hall Textbook of Medical Physiology",
            "Dược thư Quốc gia Việt Nam",
            "Hướng dẫn chẩn đoán và điều trị bệnh nội khoa - BV Bạch Mai"
          ]
        }
      });
    }

    // 2. Trào ngược dạ dày / Thực quản / Thượng vị
    if (text.includes('ợ chua') || text.includes('ợ hơi') || text.includes('trào ngược') || text.includes('dạ dày') || text.includes('thượng vị') || text.includes('xương ức') || text.includes('nghẹn')) {
      return res.json({
        success: true,
        data: {
          summary: "Triệu chứng Bệnh trào ngược dạ dày thực quản (GERD) kết hợp viêm trợt hang vị dạ dày, Đông y biện chứng thuộc thể Tỳ Vị Hư Hàn kiêm Can Khí Phạm Vị.",
          possibleWesternDiseases: [
            {
              name: "Bệnh trào ngược dạ dày thực quản (GERD) / Viêm dạ dày trợt",
              icd10: "K21.9 / K29.6",
              explanation: "Theo Guyton & Hall: Trương lực cơ vòng thực quản dưới (LES) suy giảm làm acid dạ dày và pepsin trào ngược lên gây viêm niêm mạc thực quản và co thắt cảm giác nghẹn ở cổ.",
              urgency: "Cần theo dõi"
            }
          ],
          easternSyndrome: {
            name: "Tỳ Vị Hư Hàn kiêm Can Khí Hoành Nghịch (Mai hạch khí)",
            explanation: "Tỳ vị hư hàn không vận hóa được thủy cốc, Vị khí nghịch bốc lên sinh ợ chua nóng rát; Can khí uất kết gây nghẹn họng.",
            tangPhu: "Tỳ, Vị và Can"
          },
          herbalRemedy: {
            formulaName: "Hoàng Kỳ Kiến Trung Thang hợp Bán Hạ Hậu Phác Thang (Dan Bensky)",
            herbs: [
              { name: "Hoàng Kỳ", amount: "16g", purpose: "Đại bổ tỳ khí, làm ấm trung tiêu" },
              { name: "Bạch Thược", amount: "12g", purpose: "Nhu can chỉ thống, giảm co bóp" },
              { name: "Bán Hạ Chế", amount: "10g", purpose: "Hòa vị giáng nghịch, trừ đờm nghẹn" },
              { name: "Hậu Phác", amount: "10g", purpose: "Hạ khí tiêu đầy trướng bụng" }
            ],
            howToUse: "Sắc uống ấm trước bữa ăn 1 giờ. Tuyệt đối không uống nước đá lạnh."
          },
          acupressureAndNeedling: {
            tungPoints: [
              {
                name: "Trọng Tử (11.01) & Trọng Tiên (11.02)",
                code: "Khu 11 Lòng bàn tay",
                howToPress: "Day ấn mạnh kẽ ngón tay cái và trỏ lòng bàn tay kết hợp nuốt nước bọt sâu để giải tỏa nghẹn họng."
              }
            ],
            classicPoints: [
              { name: "Trung Quản (Ren-12)", howToPress: "Trên rốn 4 thốn, xoa tròn ấm và day ấn nhẹ 2 phút." },
              { name: "Nội Quan (PC-6)", howToPress: "Cách ngấn cổ tay 2 thốn, ấn sâu 1-2 phút hết buồn nôn và nóng rát." }
            ]
          },
          nutritionAndLifestyle: {
            doEat: ["Cháo ấm hạt sen, bột sắn dây chín", "Nước ép bắp cải ấm làm lành vết loét", "Khoai lang luộc"],
            dontEat: ["Nước đá lạnh, nước ngọt có ga, kem", "Gia vị cay nồng (ớt, tiêu, mù tạt)", "Cà phê đặc, đồ chiên rán mỡ, ăn đêm"],
            homeCare: "Kê cao đầu giường 15 độ khi ngủ; sau ăn không nằm ngay; xoa ấm bụng quanh rốn 50 vòng mỗi tối."
          },
          westernMedicationPlan: {
            protocolName: "Phác đồ điều trị Trào ngược dạ dày thực quản (GERD) & Viêm dạ dày (BV Bạch Mai & Chợ Rẫy)",
            sourceGuidelines: ["Phác đồ điều trị Nội khoa BV Chợ Rẫy", "Dược thư Quốc gia Việt Nam", "DiPiro Pharmacotherapy", "Vidal Việt Nam"],
            drugs: [
              {
                name: "Nexium 40mg (hoặc Pariet 20mg)",
                activeIngredient: "Esomeprazole (hoặc Rabeprazole)",
                group: "Thuốc ức chế bơm proton (PPI)",
                dosage: "40mg x 1 lần/ngày",
                usage: "Uống trước bữa ăn sáng 30 - 60 phút",
                mechanism: "Ức chế enzym H+/K+ ATPase tại màng tế bào viền dạ dày, ngăn chặn giai đoạn cuối tiết acid dịch vị suốt 24 giờ",
                caution: "Liệu trình chuẩn từ 4 đến 8 tuần. Không ngưng thuốc đột ngột tránh bùng phát acid"
              },
              {
                name: "Gaviscon Dual Action (hoặc Phosphalugel)",
                activeIngredient: "Natri Alginate, Calci Carbonat, Natri Bicarbonat",
                group: "Thuốc kháng acid & tạo màng gel bảo vệ niêm mạc (Antacid / Alginate)",
                dosage: "10ml (1 gói) x 3-4 lần/ngày",
                usage: "Uống sau các bữa ăn chính 1 giờ và trước khi đi ngủ, hoặc khi đau rát cổ họng",
                mechanism: "Phản ứng nhanh với acid dạ dày tạo lớp gel alginic pH trung tính bồng bềnh ngăn chặn acid trào ngược lên thực quản",
                caution: "Uống cách xa các thuốc đường uống khác ít nhất 2 giờ để tránh cản trở hấp thu"
              },
              {
                name: "Motilium-M 10mg",
                activeIngredient: "Domperidone",
                group: "Thuốc điều hòa nhu động ruột & chống nôn (Prokinetic)",
                dosage: "10mg x 2-3 lần/ngày",
                usage: "Uống trước các bữa ăn 15 - 30 phút",
                mechanism: "Kháng thụ thể Dopamine D2 ngoại vi, làm tăng trương lực cơ thắt thực quản dưới (LES) và gia tăng tốc độ tháo rỗng dạ dày",
                caution: "Thời gian dùng không quá 7 ngày; thận trọng ở người có bệnh lý tim mạch"
              }
            ],
            notes: "Kê cao đầu giường 15-20cm, không nằm ngay sau khi ăn tối thiểu 2 giờ, kiêng bia rượu, cà phê và thức ăn cay béo."
          },
          emergencySigns: ["Nôn ra máu tươi hoặc dịch bã cà phê", "Đi ngoài phân đen nhánh tanh khắm", "Nuốt nghẹn hoàn toàn"],
          referencedBooks: [
            "The Foundations of Chinese Medicine - Giovanni Maciocia",
            "Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ",
            "Chinese Herbal Medicine: Materia Medica - Dan Bensky",
            "Essentials of Nutrition in Medicine and Healthcare",
            "Dược thư Quốc gia Việt Nam",
            "Phác đồ điều trị Nội khoa - BV Chợ Rẫy"
          ]
        }
      });
    }

    // 3. Mất ngủ mạn tính / Hồi hộp
    if (text.includes('mất ngủ') || text.includes('khó ngủ') || text.includes('thức trắng') || text.includes('hồi hộp') || text.includes('giật mình') || text.includes('mộng mị') || text.includes('ngủ')) {
      return res.json({
        success: true,
        data: {
          summary: "Rối loạn mất ngủ mạn tính (Insomnia) kết hợp suy nhược thần kinh, Đông y biện chứng thuộc thể Tâm Tỳ Lưỡng Hư (Tâm huyết hư không dưỡng thần, Tỳ khí suy không sinh huyết).",
          possibleWesternDiseases: [
            {
              name: "Rối loạn mất ngủ mạn tính (Chronic Insomnia Disorder) / Lo âu nhẹ",
              icd10: "G47.0 / F41.2",
              explanation: "Theo Guyton & Hall: Suy giảm bài tiết melatonin tuyến tùng và giảm ức chế GABA vỏ não làm hệ lưới hoạt hóa truyền lên ARAS luôn bị hưng phấn, gây khó vào giấc ngủ và dễ thức giấc.",
              urgency: "Cần điều chỉnh"
            }
          ],
          easternSyndrome: {
            name: "Tâm Tỳ Lưỡng Hư - Thần Bất Thủ Xá",
            explanation: "Tâm tạng chủ thần minh suy giảm, Tỳ tạng chủ sinh huyết hư tổn; huyết hư không dưỡng tâm thần làm thần khí phiêu bạt sinh trằn trọc mộng mị.",
            tangPhu: "Tâm và Tỳ"
          },
          herbalRemedy: {
            formulaName: "Quy Tỳ Thang gia giảm (Tế Sinh Phương & Dan Bensky)",
            herbs: [
              { name: "Bạch Truật", amount: "12g", purpose: "Kiện tỳ ích khí" },
              { name: "Hoàng Kỳ", amount: "14g", purpose: "Bổ tỳ phế, cố biểu" },
              { name: "Toan Táo Nhân (sao đen)", amount: "12g", purpose: "Dưỡng tâm an thần trị giật mình" },
              { name: "Long Nhãn", amount: "12g", purpose: "Bổ tâm tỳ huyết" }
            ],
            howToUse: "Toan táo nhân giã dập sao đen. Sắc ngày 1 thang uống ấm trước khi ngủ 1 giờ."
          },
          acupressureAndNeedling: {
            tungPoints: [
              {
                name: "Trấn Tĩnh & Thận Quan (77.18)",
                code: "Giữa trán & Cẳng chân",
                howToPress: "Day nhẹ điểm giữa trán kết hợp hít thở sâu 10 nhịp giúp sóng não chuyển sang Alpha êm dịu."
              }
            ],
            classicPoints: [
              { name: "Thần Môn (HT-7)", howToPress: "Tại nếp gấp cổ tay phía ngón út, ấn giữ 2 phút định tâm an thần." },
              { name: "An Miên (Sau tai)", howToPress: "Chỗ lõm sau dái tai ngang chân tóc gáy, day tròn 2 phút." }
            ]
          },
          nutritionAndLifestyle: {
            doEat: ["Trà hoa cúc, tâm sen uống lúc 20h", "Chè hạt sen long nhãn táo đỏ", "Chuối chín, quả óc chó"],
            dontEat: ["Cà phê, trà xanh đặc sau 14h chiều", "Rượu bia (làm đứt đoạn giấc ngủ sâu)", "Bữa tối quá no"],
            homeCare: "Ngâm chân nước ấm 15 phút trước khi ngủ; tắt màn hình điện thoại 45 phút trước khi đi ngủ."
          },
          westernMedicationPlan: {
            protocolName: "Phác đồ điều trị Rối loạn giấc ngủ & Lo âu suy nhược (Insomnia Protocol - Dược thư QG & DiPiro)",
            sourceGuidelines: ["Dược thư Quốc gia Việt Nam", "Sổ tay MIMS Việt Nam", "DiPiro Pharmacotherapy", "Lexicomp Drug Information Handbook"],
            drugs: [
              {
                name: "Rotundin 60mg",
                activeIngredient: "Rotundin (L-Tetrahydropalmatin chiết xuất Củ Bình Vôi)",
                group: "Thuốc an thần gây ngủ nguồn gốc tự nhiên",
                dosage: "30mg - 60mg x 1 lần/ngày",
                usage: "Uống trước khi đi ngủ 30 - 45 phút",
                mechanism: "Tác động chọn lọc lên hệ lưới hoạt hóa vỏ não, kích hoạt thụ thể GABA-A và phong bế thụ thể Dopamine D2, gây buồn ngủ sinh lý êm dịu không mệt mỏi vào sáng hôm sau",
                caution: "Không dùng chung với rượu bia; không dùng khi đang lái xe hoặc vận hành máy móc"
              },
              {
                name: "Melatonin 3mg - 5mg",
                activeIngredient: "Melatonin",
                group: "Hormone điều hòa nhịp sinh học thức - ngủ",
                dosage: "3mg - 5mg x 1 lần/ngày",
                usage: "Uống trước giờ ngủ 1 giờ",
                mechanism: "Gắn vào thụ thể MT1 và MT2 ở nhân trên chéo (SCN) vùng dưới đồi, tái lập chu kỳ sinh học ngày - đêm tự nhiên",
                caution: "Tránh ánh sáng xanh điện thoại sau khi uống thuốc"
              },
              {
                name: "Magie B6 (Magnesium + Pyridoxine)",
                activeIngredient: "Magnesium lactate dihydrate 470mg + Vitamin B6 5mg",
                group: "Khoáng chất và Vitamin dinh dưỡng thần kinh",
                dosage: "1 viên x 2 lần/ngày (sáng - chiều)",
                usage: "Uống sau bữa ăn với nhiều nước",
                mechanism: "Magie tham gia ức chế dẫn truyền thần kinh cơ kích thích, B6 tham gia tổng hợp GABA và Serotonin giúp giải tỏa stress thần kinh",
                caution: "Chống chỉ định suy thận nặng"
              }
            ],
            notes: "Thiết lập thói quen đi ngủ đúng giờ, ngâm chân nước ấm thảo dược lúc 20h30, không dùng chất kích thích sau 14h chiều."
          },
          emergencySigns: ["Cơn hoảng loạn kịch phát dữ dội kèm đau thắt ngực", "Ảo giác hoặc trầm cảm nặng"],
          referencedBooks: [
            "The Foundations of Chinese Medicine - Giovanni Maciocia",
            "Phương Thang Y Học Cổ Truyền - Trần Gia Kỳ",
            "Chinese Herbal Medicine: Materia Medica - Dan Bensky",
            "Essentials of Nutrition in Medicine and Healthcare",
            "Dược thư Quốc gia Việt Nam",
            "Lexicomp Drug Information Handbook"
          ]
        }
      });
    }

    // 4. Viêm xoang mũi / Nghẹt mũi / Nhức hốc mắt
    if (text.includes('xoang') || text.includes('mũi') || text.includes('nghẹt') || text.includes('hốc mắt') || text.includes('chảy dịch')) {
      return res.json({
        success: true,
        data: {
          summary: "Viêm xoang mũi dị ứng / Viêm xoang trán sàng mạn tính, Đông y xếp vào chứng Tỵ Uyên do Phế Khí Hư kiêm Phong Hàn uất hóa nhiệt.",
          possibleWesternDiseases: [
            {
              name: "Viêm mũi xoang dị ứng / Viêm xoang trán sàng mạn tính",
              icd10: "J32.8 / J30.4",
              explanation: "Theo Guyton & Hall: Phù nề niêm mạc tắc nghẽn lỗ thông xoang gây ứ đọng dịch nhầy và kích hoạt thụ thể thần kinh sinh ba V1-V2 gây đau nhức hốc mắt trán.",
              urgency: "Cần điều trị"
            }
          ],
          easternSyndrome: {
            name: "Tỵ Uyên - Phế Khí Hư nhược kiêm Phong Hàn uất nhiệt",
            explanation: "Phế khai khiếu ở mũi, phế khí hư biểu không bền làm phong hàn tà xâm nhập ứ trệ tại xoang mặt hóa mủ dịch.",
            tangPhu: "Phế và Vị"
          },
          herbalRemedy: {
            formulaName: "Thương Nhĩ Tử Tán gia giảm (Tế Sinh Phương & Dan Bensky)",
            herbs: [
              { name: "Ké Đầu Ngựa", amount: "10g", purpose: "Thông mũi, khu phong tán hàn" },
              { name: "Tân Di Hoa", amount: "8g", purpose: "Đặc hiệu thông tỵ khiếu" },
              { name: "Bạch Chỉ", amount: "10g", purpose: "Chỉ thống vùng trán hốc mắt" },
              { name: "Bạc Hà", amount: "6g", purpose: "Sơ phong thanh nhiệt" }
            ],
            howToUse: "Sắc 3 bát lấy 1 bát uống ấm sau ăn. Kết hợp xông mũi hơi thuốc ấm."
          },
          acupressureAndNeedling: {
            tungPoints: [
              {
                name: "Tứ Mã (88.17-19)",
                code: "Mặt ngoài đùi",
                howToPress: "Kỳ huyệt Đổng Thị số 1 cho bệnh xoang dị ứng: Day ấn mạnh mặt ngoài đùi 2-3 phút kết hợp hít sâu thông mũi."
              }
            ],
            classicPoints: [
              { name: "Nghinh Hương (LI-20)", howToPress: "Hai bên cánh mũi 0.5 thốn, day tròn 1-2 phút cho mũi thông ngay." },
              { name: "Ấn Đường", howToPress: "Điểm giữa hai chân mày, day ấn nhẹ giảm nhức trán." }
            ]
          },
          nutritionAndLifestyle: {
            doEat: ["Gừng tươi, tía tô, tỏi tươi kháng khuẩn", "Canh gà củ sen ấm", "Nhiều nước ấm"],
            dontEat: ["Sữa đặc, kem lạnh, phô mai (tăng tạo dịch đờm nhầy)", "Nước đá lạnh, bia rượu"],
            homeCare: "Rửa mũi bằng nước muối sinh lý ấm 0.9% ngày 2 lần; giữ ấm cổ mũi khi ra gió hoặc nằm điều hòa."
          },
          westernMedicationPlan: {
            protocolName: "Phác đồ điều trị Viêm mũi xoang dị ứng & Viêm xoang mạn (Sanford Guide & Hướng dẫn Bạch Mai)",
            sourceGuidelines: ["The Sanford Guide to Antimicrobial Therapy", "Dược thư Quốc gia Việt Nam", "Hướng dẫn BV Bạch Mai", "BNF"],
            drugs: [
              {
                name: "Telfast 60mg / 180mg (hoặc Aerius 5mg)",
                activeIngredient: "Fexofenadine HCl (hoặc Desloratadine)",
                group: "Thuốc kháng Histamin H1 thế hệ 2",
                dosage: "1 viên (60mg x 2 lần/ngày hoặc 180mg x 1 lần/ngày)",
                usage: "Uống sau bữa ăn, không uống cùng nước bưởi chùm hoặc nước cam",
                mechanism: "Ức chế cạnh tranh chọn lọc thụ thể Histamin H1 ngoại vi, không qua hàng rào máu não nên không gây buồn ngủ, cắt cơn hắt hơi, sổ mũi và ngứa mắt tức thì",
                caution: "Thận trọng ở người cao tuổi hoặc suy thận giảm độ thanh thải"
              },
              {
                name: "Flixonase 50mcg (hoặc Avamys)",
                activeIngredient: "Fluticasone Propionate (hoặc Fluticasone Furoate)",
                group: "Corticoid xịt mũi tại chỗ",
                dosage: "Xịt mỗi bên mũi 1-2 nhát x 1 lần/ngày (sáng)",
                usage: "Xịt vào niêm mạc cuốn mũi ngoài, hơi cúi đầu ra trước khi xịt, hít nhẹ qua mũi",
                mechanism: "Kháng viêm mạnh tại chỗ, làm co mạch niêm mạc xoang, giảm phù nề và thông thoáng lỗ thông xoang mũi",
                caution: "Rửa sạch đầu xịt sau mỗi lần dùng, không xịt trực tiếp vào vách ngăn mũi"
              },
              {
                name: "Acemuc 200mg (hoặc Mucomyst)",
                activeIngredient: "Acetylcysteine",
                group: "Thuốc tiêu nhầy, loãng đờm dịch xoang",
                dosage: "200mg x 3 lần/ngày",
                usage: "Uống sau bữa ăn, hòa tan viên hoặc gói vào 1/2 cốc nước",
                mechanism: "Cắt đứt các cầu nối disulfide (-S-S-) của mucoprotein dịch xoang, làm giảm độ nhớt và tống xuất dịch ứ đọng ra ngoài",
                caution: "Thận trọng ở bệnh nhân có tiền sử hen phế quản"
              }
            ],
            notes: "Rửa mũi bằng nước muối sinh lý ấm 0.9% trước khi xịt thuốc để tăng hấp thu; giữ ấm vùng cổ ngực."
          },
          emergencySigns: ["Sưng đỏ quanh mắt hoặc nhìn đôi", "Sốt cao cứng gáy đau đầu dữ dội"],
          referencedBooks: [
            "The Practice of Chinese Medicine - Giovanni Maciocia",
            "Chinese Herbal Medicine: Materia Medica - Dan Bensky",
            "Lectures on Tung’s Acupuncture - Dr. Wei-Chieh Young",
            "Guyton and Hall Textbook of Medical Physiology",
            "The Sanford Guide to Antimicrobial Therapy",
            "Dược thư Quốc gia Việt Nam"
          ]
        }
      });
    }

    // 5. Đau thắt lưng / Thần kinh tọa
    if (text.includes('lưng') || text.includes('tọa') || text.includes('thoát vị') || text.includes('l4') || text.includes('l5') || text.includes('mông') || (text.includes('chân') && (text.includes('buốt') || text.includes('tê bì') || text.includes('lan')))) {
      return res.json({
        success: true,
        data: {
          summary: "Triệu chứng chèn ép rễ thần kinh thắt lưng (Đau thần kinh tọa / Tọa Cốt Phong) do tổn thương đĩa đệm L4-L5/L5-S1, Đông y xếp vào thể Khí Trệ Huyết Ứ bế tắc kinh lạc.",
          possibleWesternDiseases: [
            {
              name: "Thoát vị đĩa đệm cột sống thắt lưng (L4-L5/L5-S1) chèn ép rễ thần kinh",
              icd10: "M51.1 / M54.3",
              explanation: "Theo Guyton & Hall: Đĩa đệm thoát vị gây phản ứng viêm cục bộ, phóng thích prostaglandin và chèn ép cơ học sợi trục thần kinh hông to, dẫn đến đau buốt dọc chi dưới.",
              urgency: "Cần theo dõi sát"
            }
          ],
          easternSyndrome: {
            name: "Tọa Cốt Phong (Khí Trệ Huyết Ứ kiêm Phong Hàn Thấp)",
            explanation: "Khí huyết ứ trệ kinh Bàng quang và Đởm, bất thông tắc thống kết hợp Can Thận suy giảm.",
            tangPhu: "Can, Thận và Bàng quang"
          },
          herbalRemedy: {
            formulaName: "Thân Thống Trục Ứ Thang (Phương Thang YHCT & Dan Bensky)",
            herbs: [
              { name: "Đương Quy", amount: "12g", purpose: "Bổ huyết hoạt huyết, hóa ứ giảm đau" },
              { name: "Xuyên Khung", amount: "10g", purpose: "Hành khí hoạt huyết trong kinh lạc" },
              { name: "Đào Nhân", amount: "10g", purpose: "Phá huyết tiêu ứ" },
              { name: "Ngưu Tất", amount: "12g", purpose: "Dẫn huyết quy kinh chi dưới, tráng cốt" }
            ],
            howToUse: "Sắc 3 bát nước lấy 1 bát, uống ấm sau bữa ăn. Giữ ấm lưng tránh nhiễm lạnh."
          },
          acupressureAndNeedling: {
            tungPoints: [
              {
                name: "Linh Cốt (22.05) & Đại Bạch (22.04)",
                code: "Khu 22 Mu tay",
                howToPress: "Động khí châm pháp: Day ấn mạnh vào kẽ ngón tay cái và trỏ mu bàn tay (bên đối diện chân đau) 2-3 phút đồng thời xoay nhẹ thắt lưng để cắt cơn đau tức thì."
              }
            ],
            classicPoints: [
              { name: "Ủy Trung (BL-40)", howToPress: "Day ấn chính giữa nếp gấp khoeo chân 1-2 phút giải phóng kinh khí lưng." },
              { name: "Côn Lôn (BL-60)", howToPress: "Day sau mắt cá ngoài chân giúp thông dương khí thắt lưng." }
            ]
          },
          nutritionAndLifestyle: {
            doEat: ["Cá béo giàu Omega-3 kháng viêm", "Nước hầm xương cung cấp collagen tự nhiên", "Rau bina, bông cải giàu magie thư giãn cơ"],
            dontEat: ["Rượu bia, chất kích thích", "Thực phẩm nhiều đường tinh luyện làm thoái hóa sụn khớp"],
            homeCare: "Nằm nghỉ trên đệm phẳng cứng vừa, chườm ấm lưng 20 phút mỗi tối, tập bài kéo gối làm mềm bụng."
          },
          westernMedicationPlan: {
            protocolName: "Phác đồ điều trị Đau thần kinh tọa do thoát vị đĩa đệm (Sciatica Protocol - BV Chợ Rẫy & Bạch Mai)",
            sourceGuidelines: ["Phác đồ điều trị Nội khoa BV Chợ Rẫy", "Hướng dẫn BV Bạch Mai", "DiPiro Pharmacotherapy", "Dược thư Quốc gia VN"],
            drugs: [
              {
                name: "Mobic 15mg (hoặc Celebrex 200mg)",
                activeIngredient: "Meloxicam 15mg (hoặc Celecoxib 200mg)",
                group: "Kháng viêm không steroid (NSAID ức chế COX-2)",
                dosage: "15mg x 1 lần/ngày",
                usage: "Uống ngay sau bữa ăn no với nhiều nước",
                mechanism: "Ức chế tổng hợp Prostaglandin E2 tại rễ thần kinh bị chèn ép, giảm phù nề rễ và giảm đau buốt",
                caution: "Chống chỉ định loét dạ dày tá tràng tiến triển, suy thận nặng"
              },
              {
                name: "Neurontin 300mg (hoặc Lyrica 75mg)",
                activeIngredient: "Gabapentin 300mg (hoặc Pregabalin 75mg)",
                group: "Thuốc điều trị đau thần kinh chuyên biệt (Neuropathic Pain Agent)",
                dosage: "300mg x 1 viên/ngày uống tối, tăng dần lên 300mg x 2 lần/ngày nếu cần",
                usage: "Uống trước khi đi ngủ",
                mechanism: "Gắn chọn lọc vào tiểu đơn vị alpha-2-delta của kênh Calci phụ thuộc điện thế tại rễ tủy sống, ức chế phóng thích các chất dẫn truyền xung đau (Glutamate, Substance P)",
                caution: "Có thể gây chóng mặt, buồn ngủ nhẹ trong vài ngày đầu"
              },
              {
                name: "Myonal 50mg (hoặc Decontractyl 250mg)",
                activeIngredient: "Eperisone HCl 50mg",
                group: "Thuốc giãn cơ vân tác dụng trung ương",
                dosage: "50mg x 3 lần/ngày",
                usage: "Uống sau bữa ăn",
                mechanism: "Giảm trương lực cơ cạnh sống bị co cứng phản ứng, giãn mạch vi tuần hoàn nuôi dưỡng cơ lưng",
                caution: "Thận trọng ở người cao tuổi"
              },
              {
                name: "Methycobal 500mcg",
                activeIngredient: "Methylcobalamin (Coenzyme Vitamin B12)",
                group: "Thuốc dinh dưỡng và tái tạo bao Myelin sợi thần kinh",
                dosage: "500mcg x 3 lần/ngày",
                usage: "Uống sau các bữa ăn",
                mechanism: "Tăng cường tổng hợp phospholipid và protein cấu tạo bao myelin, phục hồi dẫn truyền sợi thần kinh tọa",
                caution: "Dùng đều đặn liệu trình 4 tuần"
              }
            ],
            notes: "Nằm nghỉ trên đệm phẳng có độ đàn hồi tốt, tránh cúi gập lưng mang vác vật nặng, chườm ấm thắt lưng 20 phút mỗi tối."
          },
          emergencySigns: ["Mất cảm giác quanh hậu môn hoặc đại tiểu tiện không tự chủ (Chùm đuôi ngựa)", "Bàn chân rủ liệt không nâng lên được"],
          referencedBooks: [
            "The Practice of Chinese Medicine - Giovanni Maciocia",
            "Chinese Herbal Medicine: Materia Medica - Dan Bensky",
            "Lectures on Tung's Acupuncture - Dr. Wei-Chieh Young",
            "Guyton and Hall Textbook of Medical Physiology (15th ed)",
            "Phác đồ điều trị Nội khoa - BV Chợ Rẫy",
            "Dược thư Quốc gia Việt Nam"
          ]
        }
      });
    }

    // 6. Phân tích động chuẩn xác theo đúng triệu chứng người bệnh nhập vào (từ cơ sở dữ liệu khoa học)
    return res.json({
      success: true,
      data: generateDynamicSymptomResponse(req.body?.symptomText || '')
    });
  }
});

// Helper: Bộ máy trả lời hội chẩn lâm sàng chuyên sâu từ 65 Y Điển & Cơ sở dữ liệu khoa học
function generateClinicalConsultationAnswer(query: string, _rawMessages?: any[], bookFilter?: string): string {
  const q = (query || '').toLowerCase().trim();

  // 1. Bệnh Gout / Guot / Thống phong -> Chuyển thẳng vào Bộ Máy Bác Sĩ Hội Chẩn Chuyên Khoa (đầy đủ Định nghĩa, Nguyên nhân, 4 Giai đoạn Gout & Phác đồ Đông - Tây Y)
  if ((q.includes('gout') || q.includes('guot') || q.includes('gút') || q.includes('thống phong') || q.includes('podagra')) && !bookFilter) {
    return generatePreciseScientificAnswer(query, bookFilter);
  }

  // 2. Phân biệt Can Dương Thượng Kháng với Tăng huyết áp nguyên phát
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
• Mạch & Thiệt chẩn:
  • Đông Y: Lưỡi đỏ, rêu vàng mỏng hoặc ít rêu. Mạch Huyền sác hoặc Huyền tế sác.
  • Tây Y: Tăng huyết áp có thể biểu hiện bằng nhiều thể Đông Y khác nhau: Can Dương Thượng Kháng, Can Hỏa Thượng Viêm, Đàm Thấp ứ trệ, hoặc Âm Dương Lưỡng Hư.

3. PHÁC ĐỒ PHỐI HỢP ĐIỀU TRỊ ĐÔNG - TÂY Y TOÀN DIỆN
• Thuốc Tây Y chuẩn hóa: Telmisartan 40mg (Micardis) uống 1 viên sáng (ức chế AT1 Angiotensin II) hoặc phối hợp Amlodipine 5mg.
• Bài thuốc Đông Y kinh điển: Thiên Ma Câu Đằng Ẩm (Thiên ma 10g, Câu đằng 12g, Thạch quyết minh 20g, Chi tử 8g, Hoàng cầm 10g, Ngưu tất 12g, Đỗ trọng 12g, Tang ký sinh 16g).
• Huyệt vị đặc hiệu: Đổng Thị Hỏa Ngạnh (66.03), Chính Hội (1010.01); Thể châm Thái Xung (LR-3) tả, Phong Trì (GB-20), Thái Khê (KI-3) bổ.`);
  }

  // 3. Cơ chế bài thuốc Tiêu Dao Tán và đối chiếu trục Não - Ruột
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

  // 4. Kỹ thuật Mãng châm Nguyễn Tài Thu trong tai biến mạch máu não
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

  // Truy xuất trực tiếp từ Bộ Máy Khoa Học Đa Tầng (239 Đổng Thị Kỳ Huyệt, 295 Phác Đồ, 58 Kỳ Huyệt WHO, 300 Vị Thuốc, Thuốc Tây Y, 82+ Sách Y Điển)
  return cleanMedicalText(generatePreciseScientificAnswer(query, bookFilter));
}

// API Trò chuyện lâm sàng Y Đạo (Hội chẩn cùng AI y học - hỗ trợ đọc 1 hoặc nhiều ảnh đơn thuốc)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages, context, imageBase64, imageMimeType, images } = req.body;
  const userMessages = (messages || []).filter((m: any) => m.role === 'user');
  const lastUserMessage =
    userMessages.length > 0
      ? userMessages[userMessages.length - 1].content
      : req.body.query || '';

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

  const imageParts = rawImageInputs.map((img) => {
    const detectedMimeMatch = img.base64.match(/^data:(image\/[\w.+-]+);base64,/);
    const mimeType =
      img.mimeType || (detectedMimeMatch ? detectedMimeMatch[1] : 'image/jpeg');
    const data = img.base64.replace(/^data:image\/[\w.+-]+;base64,/, '').trim();
    return {
      inlineData: {
        mimeType,
        data,
      },
    };
  });

  const hasImage = imageParts.length > 0;
  const ragContext = buildScientificRagContext(lastUserMessage);

  try {
    const ai = getGeminiClient();
    if (!ai) {
      if (hasImage) {
        return res.json({
          reply:
            '1. THÔNG BÁO ĐỌC HÌNH ẢNH ĐƠN THUỐC\n• Để Bác sĩ AI đọc và phân tích trực tiếp các hình ảnh đơn thuốc bạn vừa tải lên, hệ thống cần kết nối mô hình thị giác Gemini API trên máy chủ (kiểm tra khóa API trong Settings > Secrets).\n• Trong khi chưa có kết nối AI trực tuyến, bạn có thể gõ tên các thuốc ghi trên đơn (VD: Metformin, Coversyl, Omeprazole, Lục Vị...) vào khung chat để tôi tra cứu công dụng, liều dùng và tương tác thuốc từ kho 82+ Y Điển.',
          source: 'offline_notice',
        });
      }
      const fallbackReply = generateClinicalConsultationAnswer(
        lastUserMessage,
        messages
      );
      return res.json({ reply: fallbackReply, source: 'knowledge_vault' });
    }

    const prescriptionPromptBlock = hasImage
      ? `
NHIỆM VỤ ĐỌC & PHÂN TÍCH ${imageParts.length > 1 ? `TOÀN BỘ ${imageParts.length} HÌNH ẢNH ĐƠN THUỐC / PHIẾU KHÁM` : 'HÌNH ẢNH ĐƠN THUỐC / PHIẾU KHÁM'} TẢI LÊN:
Người dùng vừa tải lên ${imageParts.length} hình ảnh đơn thuốc hoặc tài liệu y khoa. Hãy quan sát thật kỹ từng dòng chữ trên ${imageParts.length > 1 ? 'TẤT CẢ các ảnh theo thứ tự (Ảnh 1, Ảnh 2...)' : 'ảnh'} (kể cả chữ viết tay, chữ in, liều lượng mg/ml, số lượng viên, ký hiệu sáng/trưa/chiều/tối, kết quả xét nghiệm, vị thuốc Đông y & gram) và trả lời theo đúng cấu trúc sạch sẽ sau (TUYỆT ĐỐI KHÔNG dùng # hoặc *):
1. TRẢ LỜI TRỰC TIẾP & TÓM TẮT ĐƠN THUỐC TRONG ${imageParts.length > 1 ? `${imageParts.length} ẢNH` : 'ẢNH'}
• Nêu rõ đây là đơn thuốc điều trị nhóm bệnh gì (nếu có nhiều ảnh: tóm tắt nội dung từng ảnh và mối liên hệ tổng thể giữa các đơn/phiếu xét nghiệm) và trả lời trực tiếp câu hỏi kèm theo của người dùng: "${lastUserMessage}".
• Nếu có chữ viết tay quá mờ hoặc bị che khuất không chắc chắn 100%, PHẢI ghi rõ "[chữ mờ - cần xác nhận lại với bác sĩ/dược sĩ kê đơn]", TUYỆT ĐỐI KHÔNG tự đoán bừa tên thuốc hay liều lượng.

2. CHI TIẾT TỪNG THUỐC / VỊ THUỐC TRÊN ĐƠN${imageParts.length > 1 ? ' (ĐỐI CHIẾU ĐẦY ĐỦ QUA TẤT CẢ CÁC ẢNH)' : ''}
• Liệt kê từng mục đọc được trên từng ảnh theo định dạng:
  • Tên thuốc / Vị thuốc (Hoạt chất & Hàm lượng ghi trên đơn): Nhóm dược lý/tác dụng chính — Cách dùng, thời điểm uống (trước ăn, sau ăn, sáng/tối) — Lưu ý đặc biệt (không nhai/bẻ viên, uống nhiều nước...).

3. KIỂM TRA AN TOÀN, TRÙNG THUỐC, TƯƠNG TÁC THUỐC & TÁC DỤNG PHỤ
• Kiểm tra có trùng nhóm/trùng hoạt chất (đặc biệt khi ghép nhiều đơn thuốc ở các ảnh khác nhau), tương tác đáng chú ý giữa các thuốc Tây y hoặc giữa thuốc Tây y với thảo dược Đông y (giãn cách tối thiểu 1.5 - 2 giờ nếu dùng song song).
• Các tác dụng phụ thường gặp cần theo dõi và dấu hiệu bất thường cần báo ngay cho bác sĩ.

4. HƯỚNG DẪN CHĂM SÓC, DINH DƯỠNG & PHỐI HỢP ĐÔNG Y AN TOÀN (NẾU PHÙ HỢP)
• Chế độ ăn uống, sinh hoạt hỗ trợ hiệu quả điều trị và lưu ý các thực phẩm/thảo dược cần tránh khi đang dùng đơn thuốc này.`
      : '';

    const systemPrompt = `${MASTER_MEDICAL_PROMPT}
Bệnh cảnh đang trao đổi (nếu có): ${context ? JSON.stringify(context) : 'Hội chẩn Y Đạo Toàn Thư'}.
${prescriptionPromptBlock}
QUY TRÌNH PHÂN TÍCH CÂU HỎI BẮT BUỘC:
Bước 1: Đọc nguyên văn câu hỏi "${lastUserMessage}" — xác định chính xác từng vế hỏi, thuật ngữ y khoa, con số xét nghiệm, bệnh nền/chống chỉ định được nhắc tới.
Bước 2: Mở đầu bằng mục "1. TRẢ LỜI TRỰC TIẾP ĐÚNG TRỌNG TÂM CÂU HỎI", trả lời thẳng vào ĐÚNG vấn đề người hỏi đặt ra (nếu câu hỏi hỏi 2-3 ý thì đánh số trả lời đủ cả 2-3 ý).
Bước 3: Trình bày phân tích chuyên sâu Đông - Tây Y (Harrison's 21st, Guyton & Hall, ESC/ADA/KDIGO/GOLD 2024-2025 + Nội Kinh, Thương Hàn, Hải Thượng, Maciocia, Bensky, Đổng Thị, Nguyễn Tài Thu) CHỈ cho những khía cạnh liên quan trực tiếp câu hỏi. Tuyệt đối không dùng # hay * và không chèn link URL.`;

    const recentHistory = (messages || [])
      .slice(-6)
      .map(
        (m: any) =>
          `${m.role === 'user' ? 'Người hỏi' : 'Bác sĩ AI'}: ${m.content}`
      )
      .join('\n\n');

    const contentsText = `${recentHistory}\n\n${ragContext}\nCÂU HỎI HIỆN TẠI CẦN TRẢ LỜI SÁT TỪNG CÂU CHỮ: "${lastUserMessage}"\n\n${
      hasImage
        ? `Hãy đọc kỹ toàn bộ ${imageParts.length} hình ảnh đơn thuốc/tài liệu y khoa đính kèm, liệt kê chính xác từng thuốc/liều dùng đọc được ở từng ảnh, kiểm tra trùng hoạt chất/tương tác và trả lời sát câu hỏi của người dùng (trình bày sạch sẽ không #, không *).`
        : 'Hãy trả lời trực diện, đúng trọng tâm từng ý hỏi, chuẩn xác chuyên môn Đông - Tây Y và trình bày sạch sẽ (không #, không *).'
    }`;

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
      hasImage ? 65000 : 42000,
      ThinkingLevel.HIGH
    );

    const replyText = cleanMedicalText(response?.text || '');
    if (replyText.trim()) {
      return res.json({ reply: replyText, source: 'gemini' });
    }

    if (hasImage) {
      return res.status(502).json({
        error: 'Không nhận được nội dung phân tích từ hình ảnh đơn thuốc. Vui lòng chụp rõ nét hơn và thử lại.',
      });
    }

    const fallbackReply = generateClinicalConsultationAnswer(
      lastUserMessage,
      messages
    );
    return res.json({ reply: fallbackReply, source: 'knowledge_vault' });
  } catch (error: any) {
    console.warn(
      'Chat API switched to scientific knowledge engine:',
      error?.message || error
    );
    if (hasImage) {
      return res.status(500).json({
        error:
          'Không thể phân tích hình ảnh đơn thuốc lúc này. Vui lòng kiểm tra kết nối hoặc thử tải lại ảnh rõ nét hơn.',
      });
    }
    const fallbackReply = generateClinicalConsultationAnswer(
      lastUserMessage,
      messages
    );
    return res.json({ reply: fallbackReply, source: 'knowledge_vault' });
  }
});

// API Tra cứu hỏi đáp kho 82+ Y Điển Kinh Điển & Hiện Đại
app.post('/api/ask-library', async (req: Request, res: Response) => {
  const { query, bookId } = req.body;
  const q = query || '';
  const ragContext = buildScientificRagContext(q, bookId);

  try {
    const ai = getGeminiClient();
    if (!ai) {
      const answer = generateClinicalConsultationAnswer(q, undefined, bookId);
      return res.json({ answer, source: 'knowledge_vault' });
    }

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: `Tra cứu chuyên sâu trong kho 82+ Y điển Đông - Tây Y (Trọng tâm sách đang chọn: ${bookId || 'Toàn bộ thư viện Y Đạo Toàn Thư'}).
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
      42000,
      ThinkingLevel.HIGH
    );

    const answer = cleanMedicalText(response?.text || '');
    if (answer.trim()) {
      return res.json({ answer, source: 'gemini' });
    }

    return res.json({ answer: generateClinicalConsultationAnswer(q, undefined, bookId), source: 'knowledge_vault' });
  } catch (error: any) {
    console.warn('Ask Library switched to scientific knowledge engine:', error?.message || error);
    return res.json({ answer: generateClinicalConsultationAnswer(q, undefined, bookId), source: 'knowledge_vault' });
  }
});

// API Quét chuyên sâu tương tác thuốc Đông - Tây Y
app.post('/api/check-interactions', async (req: Request, res: Response) => {
  try {
    const { herbs, drugs } = req.body;
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
      return res.json({
        success: true,
        summary: "Phân tích từ Dược thư Quốc gia Việt Nam & Stockley",
        guidance: "Khuyến cáo uống thuốc Đông y cách thuốc Tây y tối thiểu 1.5 - 2 giờ để tránh tương tác cơ học và chelat hóa tại dạ dày."
      });
    }

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: promptText,
        config: {
          systemInstruction: MASTER_MEDICAL_PROMPT,
        },
      },
      35000
    );

    return res.json({
      success: true,
      analysis: cleanMedicalText(response?.text || '')
    });
  } catch (err: any) {
    return res.json({
      success: true,
      guidance: "Khuyến cáo uống thuốc Đông y cách thuốc Tây y tối thiểu 1.5 - 2 giờ để tránh tương tác hấp thu tại ruột non."
    });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false, watch: null },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
