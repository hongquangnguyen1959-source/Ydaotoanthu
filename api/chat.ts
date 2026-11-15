import { handleChatRequest } from '../src/utils/aiServerHandlers';

export const config = {
  maxDuration: 60,
};

function parseBody(req: any) {
  if (!req?.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { status, payload } = await handleChatRequest(parseBody(req));
    return res.status(status).json(payload);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Lỗi xử lý hội chẩn AI.' });
  }
}
