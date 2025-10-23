export function isEmail(s?: string){ if (!s) return false; return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s); }
export function isNonEmpty(s?: string){ return typeof s === 'string' && s.trim().length>0; }
