import { rateLimit } from '../../lib/rateLimit';
import { isEmail } from '../../lib/validate';
import { secureHeaders } from '../../lib/headers';

import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';
import { getUserFromReq } from '../../lib/auth';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) { secureHeaders(res); const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; if (!rateLimit(String(ip))) return res.status(429).json({ error: 'rate_limited' }); if (!isEmail(req.body?.email)) return res.status(400).json({ error: 'invalid email' }); 
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: 'unauthenticated' });
  if (req.method !== 'POST') return res.status(405).end();
  const { teamId, email, role = 'editor' } = req.body || {};
  if (!teamId || !email) return res.status(400).json({ error: 'teamId & email required' });
  // check membership
  const tm = db.prepare('SELECT * FROM team_members WHERE teamId = ? AND userId = ?').get(teamId, user.id);
  if (!tm) return res.status(403).json({ error: 'not a team member' });
  const token = crypto.randomBytes(20).toString('hex');
  try {
    db.prepare('INSERT INTO invites (teamId,email,token,role,createdAt) VALUES (?,?,?,?,?)').run(teamId, email, token, role, new Date().toISOString());
    // In production: send email. Here we return the token so you can simulate sending.
    return res.status(201).json({ invited: true, token });
  } catch (e) {
    return res.status(500).json({ error: 'could not create invite' });
  }
}
