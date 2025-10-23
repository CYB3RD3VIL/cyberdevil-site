import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse){ res.status(200).json({ info: 'Run axe in browser or use automated CI checks (axe-core)' }); }
