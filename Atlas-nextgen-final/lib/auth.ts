import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
export function getUserFromReq(req: NextApiRequest){
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/token=([^;\s]+)/);
  const token = m ? m[1] : null;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (e){
    return null;
  }
}
