import type { NextApiRequest, NextApiResponse } from 'next';
// naive event capture - in production forward to analytics provider or queue
export default function handler(req: NextApiRequest, res: NextApiResponse){ if (req.method !== 'POST') return res.status(405).end(); console.log('analytics event', req.body); return res.status(200).json({ ok: true }); }
