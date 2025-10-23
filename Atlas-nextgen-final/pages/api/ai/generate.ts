import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { prompt, mode } = req.body || {}
  if (!prompt) return res.status(400).json({ error: 'prompt required' })
  // different modes: summarize, rewrite, brainstorm
  if (mode === 'summarize') {
    return res.status(200).json({ text: 'Summary (demo): ' + prompt.slice(0,200) })
  }
  if (mode === 'rewrite') {
    return res.status(200).json({ text: 'Rewrite (demo): ' + prompt.slice(0,200) })
  }
  if (mode === 'brainstorm') {
    return res.status(200).json({ text: 'Brainstorm ideas (demo): ' + prompt.slice(0,200) })
  }
  // default echo
  const result = `AI (demo) response for prompt: ${prompt.slice(0,200)}`
  return res.status(200).json({ text: result })
}
