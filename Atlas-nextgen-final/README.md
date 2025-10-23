Atlas NextGen - generated scaffold
This scaffold is a starting point for a full transformation to a Next.js full-stack app.
Run locally:
  npm install
  npm run dev
Notes:
- API routes are demo placeholders.
- For Replit, the project includes .replit and replit.nix.
- To wire real AI, set up environment variables and replace pages/api/ai/generate.ts with real adapter.


## Phase 2 additions
- Yjs websocket server (yjs-server.js)
- Teams API and UI
- PWA manifest and service worker
- Editor toolbar with AI modes and presence indicator
- CI workflow
- DB schema extended for teams


## Phase 2 - Complete Enhancements
- Yjs client integration (YjsEditor component)
- Invite workflow (create + accept) with tokens stored in DB
- Security helpers (rate limiting, input validation, secure headers)
- Service worker + manifest for PWA
- CI runs tests and builds
- Tests scaffolding added


## Phase 3 - ProseMirror, Email invites, Admin, Sentry & Tests
- Added ProseMirrorEditor bound to Yjs (y-prosemirror)
- Invite sending via nodemailer (uses Ethereal if no SMTP configured)
- Admin UI to send invites and manage teams
- Sentry init stub added
- More tests and CI config updated


## Phases 4 & 5 - Accessibility, i18n, Storybook, Mobile Scaffold, Analytics & Integrations
- Accessibility checklist & axe scaffold
- next-i18next i18n scaffold (locales in public/locales)
- Storybook scaffold with a sample story
- Mobile Expo scaffold in /mobile
- Analytics API and feature flag system
- Integrations folder placeholders for Notion/Google Drive/Slack
- Performance and Lighthouse improvement notes


## Finalization Checklist
- Install deps: npm install
- Set env vars: JWT_SECRET, NEXT_PUBLIC_YJS_URL (if remote), SENTRY_DSN (optional), SMTP_* for invites
- Start services: npm run start-all (starts yjs, socket, next dev)
- Run tests: npm test
- Run e2e: npx cypress open or npx cypress run
- Build for production: npm run build && npm run start
- Use GitHub Actions for CI (configured)
