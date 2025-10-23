import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  res.status(200).json({ info: 'For Replit deploy, run a separate socket server. This demo uses client-side fallback.' })
}
