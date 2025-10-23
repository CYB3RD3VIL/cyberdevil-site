// Google Drive Adapter (placeholder)
// Use googleapis package and OAuth2 client. This file outlines where to plug in auth and calls.
const { google } = require('googleapis');

class GDriveAdapter {
  constructor(oauth2Client) {
    this.drive = google.drive({ version: 'v3', auth: oauth2Client });
  }
  async uploadFile(name, mimeType, buffer) {
    const res = await this.drive.files.create({
      requestBody: { name, mimeType },
      media: { mimeType, body: buffer }
    });
    return res.data;
  }
  async listFiles() {
    const res = await this.drive.files.list();
    return res.data;
  }
}

module.exports = GDriveAdapter;
