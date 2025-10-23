import { rateLimit } from '../../../lib/rateLimit';
import { isEmail, isNonEmpty } from '../../../lib/validate';
import { secureHeaders } from '../../../lib/headers';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import db from '../../../db';

export default function handler(req: NextApiRequest, res: NextApiResponse){ secureHeaders(res); if (!rateLimit(req.headers['x-forwarded-for']||req.socket.remoteAddress)) return res.status(429).json({error:'rate_limited'});
  if (req.method !== 'POST') return res.status(405).end();
  const { email, name, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  const hashed = bcrypt.hashSync(password, 8);
  try {
    const stmt = db.prepare('INSERT INTO users (email,name,password,createdAt) VALUES (?,?,?,?)');
    const info = stmt.run(email, name || null, hashed, new Date().toISOString());
    return res.status(201).json({ id: info.lastInsertRowid, email });
  } catch (err) {
    return res.status(400).json({ error: 'could not create user' });
  }
}
