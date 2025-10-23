import { secureHeaders } from '../../../lib/headers';
import { rateLimit } from '../../../lib/rateLimit';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../../db';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export default function handler(req: NextApiRequest, res: NextApiResponse){ secureHeaders(res); if (!rateLimit(req.headers['x-forwarded-for']||req.socket.remoteAddress)) return res.status(429).json({error:'rate_limited'});
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  try {
    const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!row) return res.status(401).json({ error: 'invalid' });
    const ok = bcrypt.compareSync(password, row.password);
    if (!ok) return res.status(401).json({ error: 'invalid' });
    const token = jwt.sign({ id: row.id, email: row.email }, JWT_SECRET, { expiresIn: '7d' });
    // set cookie
    res.setHeader('Set-Cookie', serialize('token', token, { path: '/', httpOnly: true, maxAge: 60*60*24*7 }));
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'server error' });
  }
}
