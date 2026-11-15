import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  handleDiagnoseRequest,
  handleSymptomAnswerRequest,
  handleChatRequest,
  handleAskLibraryRequest,
  handleCheckInteractionsRequest,
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

// Kiểm tra trạng thái máy chủ & cấu hình AI (không lộ key)
app.get('/api/health', (_req: Request, res: Response) => {
  const rawKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    ''
  ).trim();
  return res.json({
    ok: true,
    aiConfigured: Boolean(rawKey && rawKey !== 'MY_GEMINI_API_KEY'),
    runtime: 'express-node',
  });
});

// API Quét chuyên sâu tương tác thuốc Đông - Tây Y
app.post('/api/check-interactions', async (req: Request, res: Response) => {
  const { status, payload } = await handleCheckInteractionsRequest(req.body || {});
  return res.status(status).json(payload);
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
