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

app.use(express.json({ limit: '20mb' }));

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

// Danh sách các mô hình Gemini hỗ trợ tạo nội dung theo thứ tự ưu tiên chuẩn hướng dẫn SDK
const CANDIDATE_MODELS = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

async function callGeminiWithModelFallback(ai: GoogleGenAI, params: any, timeoutMs = 45000) {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Gemini API timeout (${model})`)), timeoutMs)
      );

      // Cấu hình thinkingLevel tối ưu hóa tốc độ theo khuyến nghị gemini-api SKILL
      const callConfig = { ...(params.config || {}) };
      if (model === 'gemini-3.8-flash' && !callConfig.thinkingConfig) {
        callConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
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
          if (model === 'gemini-3.8-flash' && !callConfigRetry.thinkingConfig) {
            callConfigRetry.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
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
BẠN LÀ GIÁO SƯ - BÁC SĨ CHUYÊN KHOA ĐẦU NGÀNH ĐÔNG - TÂY Y KẾT HỢP (HỘI CHẨN Y ĐẠO TOÀN THƯ).
Bạn nắm vững toàn bộ kiến thức chuyên sâu từ 65 cuốn sách y điển kinh điển và các bộ sách chuyên khảo đã tải lên hệ thống (Sổ Tay Đổng Thị Kỳ Huyệt 239 huyệt & 295 phác đồ, Châm Cứu Chữa Bệnh GS. Nguyễn Tài Thu, Cẩm Nang Thực Hành Châm Cứu Lưu Viêm, Một Số Huyệt Ngoài Kinh WHO 1991, Dan Bensky Materia Medica, Giovanni Maciocia, Guyton & Hall Physiology, DiPiro Pharmacotherapy, Katzung Pharmacology, Dược thư Quốc gia Việt Nam, Nam Dược Thần Hiệu Tuệ Tĩnh & Đỗ Tất Lợi).

QUY TẮC TỐI THƯỢNG CỦA BÁC SĨ HỘI CHẨN (TRẢ LỜI SÁT CÂU HỎI 100% - KHOA HỌC - KHÔNG LẠC ĐỀ):
1. MỞ ĐẦU BẰNG MỤC "1. TRẢ LỜI TRỰC TIẾP CÂU HỎI CỦA BẠN":
   - Ngay từ đoạn đầu tiên, bạn BẮT BUỘC phải trả lời thẳng vào câu hỏi cụ thể của người dùng (Ví dụ: Nếu người bệnh hỏi "Tôi xem điện thoại ban đêm nhiều quá khiến mắt bị lồi, có thể chữa được không?", bạn phải giải thích ngay vì sao xem điện thoại ban đêm gây lồi mắt — do co quắp cơ thể mi/phù nề cơ vận nhãn hay do tăng trục trước-sau nhãn cầu trong cận thị trục, phân biệt với lồi mắt Basedow — và khẳng định rõ trường hợp nào hồi phục được hoàn toàn, trường hợp nào chặn đứng tiến triển và giảm độ lồi bằng cách nào).
   - Nếu người dùng hỏi nhiều ý trong cùng một câu, phải chia mục trả lời LẦN LƯỢT TỪNG Ý MỘT.
   - TUYỆT ĐỐI KHÔNG trả lời lạc sang bệnh khác (ví dụ: người dùng hỏi về mắt bị lồi do xem điện thoại ban đêm thì tuyệt đối không được trả lời bài chữa mất ngủ). Nếu phần dữ liệu tham khảo (RAG) đính kèm có mục không khớp với câu hỏi chính của người dùng, hãy BỎ QUA hoàn toàn mục không khớp đó và chỉ trả lời đúng câu hỏi của người dùng.
2. CHÍNH XÁC TUYỆT ĐỐI VỀ CHUYÊN MÔN ĐÔNG - TÂY Y KẾT HỢP:
   - Mục 2: Giải thích Nguyên nhân & Cơ chế sinh lý bệnh học Tây Y (Guyton & Hall) + Biện chứng Đông Y (Tạng phủ, Khí huyết).
   - Mục 3: Phác đồ điều trị Tây Y & Chuyên khoa (Thuốc đặc hiệu, liều dùng, cơ chế phân tử, phương pháp can thiệp).
   - Mục 4: Bài thuốc Đông Y / Nam Dược đặc trị (Quân - Thần - Tá - Sứ, liều lượng gram) & Tổ hợp Huyệt đạo đặc hiệu (Đổng Thị Kỳ Huyệt, Thập Tứ Chính Kinh, Kỳ Huyệt WHO kèm vị trí và cách bấm huyệt/tập phục hồi tại nhà).
   - Mục 5: Hướng dẫn chăm sóc, bài tập phục hồi tại nhà, dinh dưỡng và dấu hiệu cảnh báo (Red Flags).
3. PHONG CÁCH BÁC SĨ CHUYÊN KHOA & ĐỊNH DẠNG SẠCH SẼ (KHÔNG DÙNG DẤU # VÀ *, KHÔNG CHÈN LINK URL):
   - TUYỆT ĐỐI KHÔNG SỬ DỤNG KÝ TỰ MARKDOWN NHƯ DẤU # (###, ####) HOẶC DẤU * (**, *), và KHÔNG chèn bất kỳ đường link URL (http/https/facebook) nào vào câu trả lời. Hãy trình bày văn bản sạch sẽ bằng các đề mục đánh số (1., 2., 3.) và dấu chấm tròn đầu dòng (•).
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
Hãy thực hiện cuộc KHÁM BỆNH VÀ BIỆN CHỨNG CHẨN TRỊ TOÀN DIỆN KẾT HỢP ĐÔNG Y, NAM DƯỢC & TÂY Y bám sát 100% triệu chứng thực tế của bệnh nhân sau:
${ragContext}
THÔNG TIN BỆNH NHÂN:
- Tuổi: ${patientInfo?.age || 'Không rõ'}, Giới tính: ${patientInfo?.gender || 'Không rõ'}, Nghề nghiệp: ${patientInfo?.occupation || 'Không rõ'}
- Lý do đến khám & Triệu chứng chính: ${symptoms?.mainComplaint || 'Chưa cung cấp'}
- Khởi phát & Diễn tiến: ${symptoms?.history || 'Chưa cung cấp'}
- Vị trí đau, tính chất (âm ỉ, buốt nhói, châm chích), thang điểm đau VAS (1-10): ${symptoms?.painCharacteristics || 'Chưa cung cấp'}
- Tiền sử bệnh lý & Thuốc đang dùng: ${symptoms?.pastMedicalHistory || 'Chưa cung cấp'}

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

YÊU CẦU ĐẦU RA BẰNG JSON HỢP LỆ THEO CẤU TRÚC:
{
  "summary": "Tóm lược bệnh án súc tích trong 2 câu",
  "westernAssessment": {
    "provisionalDiagnosis": "Tên bệnh Tây Y chính xác",
    "icd10": "Mã ICD-10",
    "differentialDiagnoses": ["Chẩn đoán phân biệt 1", "Chẩn đoán phân biệt 2"],
    "guytonMechanism": "Giải thích cơ chế sinh lý bệnh học tế bào & nội môi theo Guyton & Hall",
    "investigationsNeeded": ["Xét nghiệm hoặc chẩn đoán hình ảnh cần thực hiện"],
    "redFlags": ["Dấu hiệu nguy hiểm cần nhập viện ngay lập tức (nếu có)"]
  },
  "easternAssessment": {
    "syndromePattern": "Tên thể bệnh Đông Y (VD: Can Khí Uất Kết / Can Thận Âm Hư)",
    "batCuong": "Phân tích Bát Cương (Âm Dương, Biểu Lý, Hàn Nhiệt, Hư Thực)",
    "tangPhu": "Tạng phủ liên đới chính và phụ",
    "khiHuyet": "Tình trạng Khí - Huyết - Tân dịch",
    "thietChanAnalysis": "Biện giải chi tiết Mạch tượng và Lưỡi chẩn theo Maciocia"
  },
  "integratedTreatmentPlan": {
    "phapTri": "Pháp trị Đông Y (VD: Sơ can giải uất, Hoạt huyết hóa ứ)",
    "herbalPrescription": {
      "formulaName": "Tên bài thuốc cổ phương chính (trích từ Phương Thang YHCT / Bensky)",
      "composition": [
        {"herb": "Tên dược liệu", "grams": 12, "role": "Quân/Thần/Tá/Sứ", "purpose": "Tác dụng vị thuốc"}
      ],
      "decoctionGuide": "Hướng dẫn sắc thuốc và cách uống chi tiết",
      "modifications": ["Gia giảm nếu có triệu chứng kèm theo"]
    },
    "acupuncturePrescription": {
      "classicPoints": [
        {"point": "Tên huyệt kinh điển", "location": "Vị trí giải phẫu (Deadman)", "technique": "Bổ hay Tả, độ sâu thốn, đắc khí", "purpose": "Mục đích điều trị"}
      ],
      "tungPoints": [
        {"point": "Tên huyệt Đổng Thị (VD: Linh Cốt, Tứ Mã)", "code": "Mã số", "dongQiInstructions": "Động khí châm pháp hướng dẫn vận động", "purpose": "Tác dụng đặc hiệu"}
      ],
      "nguyenTaiThuGuidance": "Kinh nghiệm điều trị hoặc chỉ định thấu huyệt / mãng châm / cứu ngải theo GS. Nguyễn Tài Thu",
      "westernNeuroscience": "Giải thích cơ chế khoa học theo Western Medical Acupuncture (Endorphin, C-fiber inhibition)"
    },
    "clinicalNutrition": {
      "dietaryTherapy": "Chế độ ăn lâm sàng (Essentials of Nutrition)",
      "foodsToEat": ["Món nên ăn"],
      "foodsToAvoid": ["Món cấm kỵ"],
      "drugNutrientInteractions": ["Cảnh báo tương tác thuốc - thực phẩm"]
    },
    "qigongAndLifestyle": "Bài tập dưỡng sinh, khí công y đạo hoặc tự day bấm huyệt tại nhà",
    "westernPrescription": {
      "protocolName": "Tên phác đồ Tây y chuẩn theo Hướng dẫn BV Bạch Mai / DiPiro / Dược thư Quốc gia",
      "sourceGuidelines": ["Dược thư Quốc gia VN", "BV Bạch Mai / Chợ Rẫy", "DiPiro Pharmacotherapy", "MIMS"],
      "medications": [
        {
          "drugName": "Tên thuốc biệt dược (VD: Mobic 15mg / Nexium 40mg / Norvasc 5mg)",
          "activeIngredient": "Hoạt chất quốc tế (VD: Meloxicam / Esomeprazole / Amlodipine)",
          "group": "Nhóm dược lý (VD: NSAID / PPI / Chẹn kênh Calci)",
          "dosage": "Liều lượng cụ thể (VD: 15mg x 1 lần/ngày)",
          "timing": "Thời điểm uống (VD: Uống sau ăn no)",
          "mechanism": "Cơ chế phân tử theo DiPiro & Katzung",
          "contraindications": "Chống chỉ định và lưu ý an toàn"
        }
      ],
      "clinicalCautions": ["Cảnh báo tương tác thuốc và lưu ý an toàn"],
      "monitoringParameters": ["Các chỉ số sinh hóa và huyết động cần kiểm tra định kỳ"]
    }
  },
  "referencedBooks": ["Danh sách các cuốn sách trong 60 y điển đã trích dẫn để xây dựng phác đồ"]
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
BỆNH NHÂN NÊU TRIỆU CHỨNG ĐỂ BÁC SĨ AI TRẢ LỜI (PHẢI PHÂN TÍCH ĐÚNG 100% TRIỆU CHỨNG NÀY, KHÔNG ĐƯỢC LẠC ĐỀ):
- Mô tả triệu chứng tự nhiên: "${symptomText}"
- Tuổi: ${age || 'Không rõ'}, Giới tính: ${gender || 'Không rõ'}
- Thời gian mắc: ${duration || 'Chưa cung cấp'}
- Lưỡi / Rêu lưỡi (nếu có): ${tongueDescription || 'Chưa quan sát'}
${ragContext}
HÃY ĐỐI CHIẾU VỚI DỮ LIỆU KHOA HỌC TRÊN VÀ TRẢ LỜI NGƯỜI BỆNH CỰC KỲ CHI TIẾT, CHUYÊN SÂU, KHOA HỌC CHÍNH XÁC THEO CẤU TRÚC JSON HỢP LỆ:
{
  "summary": "Tóm lược súc tích nhận định tình trạng của bạn",
  "possibleWesternDiseases": [
    {
      "name": "Tên bệnh Tây Y khả dĩ chính xác",
      "icd10": "Mã ICD-10",
      "explanation": "PHÂN TÍCH RẤT CHI TIẾT VÀ CHUYÊN SÂU CƠ CHẾ SINH LÝ BỆNH HỌC TẾ BÀO & MÔ THEO GUYTON & HALL PHYSIOLOGY (Nêu tỉ mỉ từ nguyên nhân chuyển hóa, men enzym, chất trung gian hóa học cytokine/prostaglandin, yếu tố nguy cơ và tổn thương mô)",
      "pathophysiology": "Phân tích chi tiết tiến trình phân tử, tổn thương vi thể, sự tiến triển mạn tính và biến chứng tim mạch/thận/xương khớp",
      "differentialDiagnoses": ["Chẩn đoán phân biệt 1", "Chẩn đoán phân biệt 2"],
      "investigations": ["Xét nghiệm máu / Sinh hóa 1", "Chẩn đoán hình ảnh 2"],
      "urgency": "Mức độ diễn tiến & Cảnh báo"
    }
  ],
  "easternSyndrome": {
    "name": "Thể bệnh Đông Y chuẩn YHCT (VD: Thống Phong Đàm Nhiệt Uất Hỏa / Can Dương Thượng Kháng)",
    "explanation": "BIỆN CHỨNG RẤT CHI TIẾT VÀ CHUYÊN SÂU NGUYÊN NHÂN BỆNH SINH THEO HỌC THUYẾT TẠNG PHỦ & KHÍ HUYẾT GIOVANNI MACIOCIA (Phân tích tỉ mỉ nguyên nhân tà khí xâm nhập, Tạng Phủ suy hư, bế tắc kinh lạc, cơ chế bất thông tắc thống)",
    "batCuong": "Phân tích Bát Cương chi tiết (Âm Dương, Biểu Lý, Hàn Nhiệt, Hư Thực)",
    "khiHuyet": "Tình trạng Khí - Huyết - Tân Dịch bị rối loạn",
    "thietChanAnalysis": "Biện giải Mạch tượng và Thiệt chẩn chi tiết theo Maciocia",
    "tangPhu": "Tạng phủ liên quan chính"
  },
  "herbalRemedy": {
    "formulaName": "Tên bài thuốc cổ phương khuyên dùng (Phương Thang YHCT / Dan Bensky)",
    "herbs": [
      {"name": "Vị thuốc", "amount": "12g", "purpose": "Tác dụng vị thuốc"}
    ],
    "howToUse": "Cách sắc uống và lưu ý gia giảm"
  },
  "acupressureAndNeedling": {
    "tungPoints": [
      {"name": "Huyệt Đổng Thị (VD: Linh Cốt, Tứ Mã)", "code": "22.05", "howToPress": "Cách day ấn bấm huyệt cắt cơn đau nhanh tại nhà (Động khí)"}
    ],
    "classicPoints": [
      {"name": "Huyệt chính kinh (Peter Deadman/Nguyễn Tài Thu)", "howToPress": "Vị trí và cách bấm day"}
    ]
  },
  "nutritionAndLifestyle": {
    "doEat": ["Món nên ăn, thực phẩm có lợi"],
    "dontEat": ["Thực phẩm kiêng kỵ tuyệt đối"],
    "homeCare": "Lời khuyên vận động, nghỉ ngơi, khí công dưỡng sinh"
  },
  "westernMedicationPlan": {
    "protocolName": "Phác đồ thuốc Tây y điều trị (theo Dược thư Quốc gia VN, BV Bạch Mai & DiPiro)",
    "drugs": [
      {
        "name": "Tên thuốc & biệt dược (VD: Meloxicam 15mg, Mobic)",
        "activeIngredient": "Hoạt chất",
        "group": "Nhóm dược lý",
        "dosage": "Liều dùng cụ thể",
        "usage": "Cách uống trước/sau ăn",
        "mechanism": "Cơ chế tác dụng",
        "caution": "Chống chỉ định và lưu ý"
      }
    ],
    "notes": "Lời dặn của dược sĩ lâm sàng"
  },
  "emergencySigns": ["Các dấu hiệu đỏ cảnh báo cần đến bệnh viện ngay lập tức"],
  "referencedBooks": ["Danh sách các cuốn sách trong 60 y điển đã trích dẫn"]
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

  // Truy xuất trực tiếp từ Bộ Máy Khoa Học Đa Tầng (239 Đổng Thị Kỳ Huyệt, 295 Phác Đồ, 58 Kỳ Huyệt WHO, 300 Vị Thuốc, Thuốc Tây Y, 65 Sách Y Điển)
  return cleanMedicalText(generatePreciseScientificAnswer(query, bookFilter));
}

// API Trò chuyện lâm sàng Y Đạo (Hội chẩn cùng AI y học)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages, context } = req.body;
  const userMessages = (messages || []).filter((m: any) => m.role === 'user');
  const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : (req.body.query || '');
  const ragContext = buildScientificRagContext(lastUserMessage);

  try {
    const ai = getGeminiClient();
    if (!ai) {
      const fallbackReply = generateClinicalConsultationAnswer(lastUserMessage, messages);
      return res.json({ reply: fallbackReply, source: 'knowledge_vault' });
    }

    const systemPrompt = `${MASTER_MEDICAL_PROMPT}
Bệnh cảnh hiện tại đang trao đổi: ${context ? JSON.stringify(context) : 'Hội chẩn Y Đạo Toàn Thư'}.
YÊU CẦU BẮT BUỘC: Câu trả lời của bạn PHẢI DỰA SÁT 100% VÀO NỘI DUNG CÂU HỎI "${lastUserMessage}", phân tích khoa học, chính xác từng vị trí giải phẫu, cơ chế sinh lý - dược lý, liều lượng và trích dẫn đúng dữ liệu sách trong hệ thống.`;

    const recentHistory = (messages || [])
      .slice(-4)
      .map((m: any) => `${m.role === 'user' ? 'Người hỏi' : 'Bác sĩ AI'}: ${m.content}`)
      .join('\n\n');

    const contentsText = `${recentHistory}\n\n${ragContext}\nCÂU HỎI HIỆN TẠI CẦN TRẢ LỜI CHÍNH XÁC: "${lastUserMessage}"\n\nHãy trả lời trực tiếp, khoa học, chính xác và đầy đủ cho câu hỏi trên.`;

    const response: any = await callGeminiWithModelFallback(
      ai,
      {
        contents: contentsText,
        config: {
          systemInstruction: systemPrompt,
        },
      },
      40000
    );

    const replyText = cleanMedicalText(response?.text || '');
    if (replyText.trim()) {
      return res.json({ reply: replyText, source: 'gemini' });
    }
    
    const fallbackReply = generateClinicalConsultationAnswer(lastUserMessage, messages);
    return res.json({ reply: fallbackReply, source: 'knowledge_vault' });
  } catch (error: any) {
    console.warn('Chat API switched to scientific knowledge engine:', error?.message || error);
    const fallbackReply = generateClinicalConsultationAnswer(lastUserMessage, messages);
    return res.json({ reply: fallbackReply, source: 'knowledge_vault' });
  }
});

// API Tra cứu hỏi đáp kho 65 cuốn sách
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
        contents: `Tra cứu chuyên sâu trong kho 65 y điển (Trọng tâm sách đang chọn: ${bookId || 'Toàn bộ thư viện Y Đạo Toàn Thư'}).
${ragContext}
CÂU HỎI CỦA NGƯỜI DÙNG: "${q}"

YÊU CẦU BẮT BUỘC: Hãy trả lời DỰA SÁT 100% VÀO NỘI DUNG CÂU HỎI TRÊN một cách khoa học, chính xác theo cấu trúc (TUYỆT ĐỐI KHÔNG dùng dấu # hay dấu *):
1. Trả lời trực tiếp câu hỏi & Lý luận cốt lõi từ sách
2. Định vị giải phẫu / Thành phần dược lý / Cơ chế sinh học chính xác
3. Phác đồ ứng dụng lâm sàng thực tế (huyệt vị / bài thuốc / liều lượng)
4. Đối chiếu khoa học Đông - Nam - Tây Y và lưu ý an toàn.`,
        config: {
          systemInstruction: MASTER_MEDICAL_PROMPT,
        },
      },
      40000
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
      server: { middlewareMode: true },
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
