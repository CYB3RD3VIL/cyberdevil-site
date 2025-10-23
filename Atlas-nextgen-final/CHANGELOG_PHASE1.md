Phase 1 changes implemented:
- Added SQLite-based persistence using better-sqlite3 (db.js)
- Auth endpoints: /api/auth/signup and /api/auth/login (cookies + JWT)
- Auth helper lib at /lib/auth.ts
- Content API now persists to DB
- Socket server added at socket-server.js (naive sync + persistence)
- Editor page enhanced with autosave, socket integration, and AI assist
- package.json updated with scripts for socket and dev:all (concurrently)
Note: Run `npm install` to install new deps. On Replit, create a second process for socket server or run `npm run socket` in Shell.
