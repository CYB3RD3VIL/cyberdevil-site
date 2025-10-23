import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db';
import { getUserFromReq } from '../../../lib/auth';
import slugify from 'slugify';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: 'unauthenticated' });
  if (req.method === 'POST') {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ error: 'name required' });
    const slug = slugify(name, { lower: true, strict: true });
    try {
      const info = db.prepare('INSERT INTO teams (name,slug,createdAt) VALUES (?,?,?)').run(name, slug, new Date().toISOString());
      const teamId = info.lastInsertRowid;
      db.prepare('INSERT INTO team_members (teamId,userId,role,addedAt) VALUES (?,?,?,?)').run(teamId, user.id, 'owner', new Date().toISOString());
      const team = db.prepare('SELECT * FROM teams WHERE id = ?').get(teamId);
      return res.status(201).json(team);
    } catch (e) {
      return res.status(400).json({ error: 'could not create team' });
    }
  }
  // list teams for user
  if (req.method === 'GET') {
    const rows = db.prepare('SELECT t.* FROM teams t JOIN team_members tm ON tm.teamId = t.id WHERE tm.userId = ?').all(user.id);
    return res.status(200).json(rows);
  }
  res.status(405).end();
}
