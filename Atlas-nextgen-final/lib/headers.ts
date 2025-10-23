// simple security headers for Next API responses
export function secureHeaders(res){ res.setHeader('X-Content-Type-Options','nosniff'); res.setHeader('X-Frame-Options','DENY'); res.setHeader('Referrer-Policy','no-referrer'); res.setHeader('X-XSS-Protection','1; mode=block'); }
