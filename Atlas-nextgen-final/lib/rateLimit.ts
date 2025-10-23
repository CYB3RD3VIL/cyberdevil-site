const attempts = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX = 60;
export function rateLimit(ip) {
  const now = Date.now();
  const rec = attempts.get(ip) || { count:0, ts: now };
  if (now - rec.ts > WINDOW_MS) { rec.count = 0; rec.ts = now; }
  rec.count += 1;
  attempts.set(ip, rec);
  return rec.count <= MAX;
}
