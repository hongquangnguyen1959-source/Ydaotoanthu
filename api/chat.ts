import { handleChatRequest } from '../src/utils/aiServerHandlers';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { status, payload } = await handleChatRequest(req.body || {});
  return res.status(status).json(payload);
}
