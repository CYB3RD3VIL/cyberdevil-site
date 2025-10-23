import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db';
import { getUserFromReq } from '../../../lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: 'unauthenticated' });
  if (req.method !== 'POST') return res.status(405).end();
  const { teamId, email, role = 'editor' } = req.body || {};
  if (!teamId || !email) return res.status(400).json({ error: 'teamId & email required' });
  // placeholder: if user exists, add; else create invite placeholder
  const u = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (u) {
    try {
      db.prepare('INSERT INTO team_members (teamId,userId,role,addedAt) VALUES (?,?,?,?)').run(teamId, u.id, role, new Date().toISOString());
      return res.status(200).json({ added: true });
    } catch (e) {
      return res.status(400).json({ error: 'could not add member' });
    }
  } else {
    // In production send invite email; store invite token table etc.
    return res.status(200).json({ invited: true });
  }
}
