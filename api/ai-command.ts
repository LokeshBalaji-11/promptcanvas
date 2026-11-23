import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parseAiCommand } from '../src/engine/commandParser';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { currentBoard, command } = req.body;
    if (!currentBoard || !command) {
      return res.status(400).json({ error: 'Missing currentBoard or command' });
    }

    const result = parseAiCommand(currentBoard, command);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
