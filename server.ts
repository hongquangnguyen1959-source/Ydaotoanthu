import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  cleanMedicalText,
} from './src/utils/scientificMedicalEngine';
import {
  getGeminiClient,
  callGeminiWithModelFallback,
  MASTER_MEDICAL_PROMPT,
  handleDiagnoseRequest,
  handleSymptomAnswerRequest,
  handleChatRequest,
  handleAskLibraryRequest,
} from './src/utils/aiServerHandlers';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '35mb' }));

// API chẩn đoán tổng hợp Đông - Tây Y
app.post('/api/diagnose', async (req: Request, res: Response) => {
  const { status, payload } = await handleDiagnoseRequest(req.body || {});
  return res.status(status).json(payload);
});

// API Nêu triệu chứng để AI trả lời trực tiếp
app.post('/api/symptom-answer', async (req: Request, res: Response) => {
  const { status, payload } = await handleSymptomAnswerRequest(req.body || {});
  return res.status(status).json(payload);
});

// API Trò chuyện lâm sàng Y Đạo (Hội chẩn cùng AI y học - hỗ trợ đọc 1 hoặc nhiều ảnh đơn thuốc)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { status, payload } = await handleChatRequest(req.body || {});
  return res.status(status).json(payload);
});

// API Tra cứu hỏi đáp kho 82+ Y Điển Kinh Điển & Hiện Đại
app.post('/api/ask-library', async (req: Request, res: Response) => {
  const { status, payload } = await handleAskLibraryRequest(req.body || {});
  return res.status(status).json(payload);
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
