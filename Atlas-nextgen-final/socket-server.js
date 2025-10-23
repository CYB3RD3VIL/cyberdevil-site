const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');
const PORT = process.env.SOCKET_PORT || 4000;

const server = http.createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
    socket.to(room).emit('presence', { id: socket.id, action: 'join' });
  });
  socket.on('leave', (room) => {
    socket.leave(room);
    socket.to(room).emit('presence', { id: socket.id, action: 'leave' });
  });
  socket.on('doc:update', ({ room, content }) => {
    // naive persistence: update doc in DB for room slug = room
    try {
      const existing = db.prepare('SELECT * FROM docs WHERE slug = ?').get(room);
      if (existing) {
        db.prepare('UPDATE docs SET content = ? WHERE slug = ?').run(content, room);
      } else {
        db.prepare('INSERT INTO docs (slug,title,content,createdAt) VALUES (?,?,?,?)').run(room, 'Untitled', content, new Date().toISOString());
      }
    } catch (e) { console.error('db write failed', e); }
    socket.to(room).emit('doc:remote-update', { room, content });
  });
  socket.on('disconnect', ()=> console.log('disconnect', socket.id));
});

server.listen(PORT, ()=> console.log('Socket server listening on', PORT));
