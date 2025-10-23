import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';
import bcrypt from 'bcryptjs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { token, email, name, password } = req.body || {};
  if (!token || !email || !password) return res.status(400).json({ error: 'token,email,password required' });
  const inv = db.prepare('SELECT * FROM invites WHERE token = ?').get(token);
  if (!inv) return res.status(400).json({ error: 'invalid token' });
  if (inv.email !== email) return res.status(400).json({ error: 'email mismatch' });
  // create user and add to team
  try {
    const hashed = bcrypt.hashSync(password,8);
    const info = db.prepare('INSERT INTO users (email,name,password,createdAt) VALUES (?,?,?,?)').run(email, name || null, hashed, new Date().toISOString());
    const userId = info.lastInsertRowid;
    db.prepare('INSERT INTO team_members (teamId,userId,role,addedAt) VALUES (?,?,?,?)').run(inv.teamId, userId, inv.role || 'editor', new Date().toISOString());
    db.prepare('UPDATE invites SET redeemedAt = ? WHERE id = ?').run(new Date().toISOString(), inv.id);
    return res.status(201).json({ created: true, userId });
  } catch (e) {
    return res.status(500).json({ error: 'could not accept invite' });
  }
}
