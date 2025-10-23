import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../db'
import { getUserFromReq } from '../../../lib/auth'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query as any
  if (req.method === 'GET'){
    const row = db.prepare('SELECT * FROM docs WHERE slug = ?').get(id);
    if (!row) return res.status(200).json({ id, content: '' });
    return res.status(200).json(row);
  }
  if (req.method === 'PUT'){
    const user = getUserFromReq(req);
    const body = req.body || {}
    const existing = db.prepare('SELECT * FROM docs WHERE slug = ?').get(id);
    if (existing){
      const stmt = db.prepare('UPDATE docs SET title = ?, content = ? WHERE slug = ?');
      stmt.run(body.title || existing.title, body.content || existing.content, id);
      const updated = db.prepare('SELECT * FROM docs WHERE slug = ?').get(id);
      return res.status(200).json(updated);
    } else {
      const stmt = db.prepare('INSERT INTO docs (slug,title,content,ownerId,createdAt) VALUES (?,?,?,?,?)');
      const info = stmt.run(id, body.title || 'Untitled', body.content || '', user ? user.id : null, new Date().toISOString());
      const row = db.prepare('SELECT * FROM docs WHERE id = ?').get(info.lastInsertRowid);
      return res.status(201).json(row);
    }
  }
  res.status(405).end()
}
