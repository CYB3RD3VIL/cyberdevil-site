/**
 * yjs-server.js
 * Simple Yjs websocket server using y-websocket package.
 * Note: Install dependency: npm install y-websocket yjs ws
 */
const WebSocket = require('ws');
const http = require('http');
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection;
const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });
server.on('upgrade', (request, socket, head) => {
  const handleAuth = (ws) => {
    setupWSConnection(ws, request, { gc: true });
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});
const PORT = process.env.YJS_PORT || 1234;
server.listen(PORT, () => console.log('Yjs websocket server listening on', PORT));
