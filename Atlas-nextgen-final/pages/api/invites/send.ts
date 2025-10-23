import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';
import { getUserFromReq } from '../../lib/auth';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: 'unauthenticated' });
  if (req.method !== 'POST') return res.status(405).end();
  const { teamId, email } = req.body || {};
  if (!teamId || !email) return res.status(400).json({ error: 'teamId & email required' });
  const inv = db.prepare('SELECT * FROM invites WHERE teamId = ? AND email = ?').get(teamId, email) || db.prepare('SELECT * FROM invites WHERE teamId = ? AND email = ?').get(teamId, email);
  // create invite if not exists
  const token = inv ? inv.token : (Math.random().toString(36).slice(2) + Date.now().toString(36));
  if (!inv) db.prepare('INSERT INTO invites (teamId,email,token,role,createdAt) VALUES (?,?,?,?,?)').run(teamId, email, token, 'editor', new Date().toISOString());
  // send email via nodemailer - use ethereal if no SMTP env configured
  let transporter;
  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  } else {
    // Use Ethereal for demo
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({ host: 'smtp.ethereal.email', port: 587, auth: { user: testAccount.user, pass: testAccount.pass } });
  }
  const acceptUrl = `${process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3000'}/accept-invite?token=${token}&email=${encodeURIComponent(email)}`;
  const info = await transporter.sendMail({
    from: process.env.INVITE_FROM || 'no-reply@example.com',
    to: email,
    subject: 'You are invited',
    text: `You have been invited. Accept: ${acceptUrl}`,
    html: `<p>You have been invited. <a href="${acceptUrl}">Accept invite</a></p>`
  });
  return res.status(200).json({ sent: true, preview: nodemailer.getTestMessageUrl(info) });
}
