// Slack Adapter (placeholder)
// Use @slack/web-api and a bot token to post messages.
const { WebClient } = require('@slack/web-api');

class SlackAdapter {
  constructor(token) { this.client = new WebClient(token); }
  async postMessage(channel, text) {
    return this.client.chat.postMessage({ channel, text });
  }
}

module.exports = SlackAdapter;
