Integration Adapters
--------------------
This folder contains starter adapters for Notion, Google Drive, and Slack.
They are templates showing how to structure integration code. To use them:
1. Install provider SDKs (e.g., @notionhq/client, googleapis, @slack/web-api).
2. Provide credentials via environment variables or Replit secrets.
3. Implement auth flows (OAuth2) on the server side and persist tokens securely.
4. Add server API routes under /pages/api/integrations/* to expose integration features.
