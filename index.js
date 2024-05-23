const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // เพิ่มบรรทัดนี้

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // ใช้ path.join() เพื่อสร้างเส้นทางไฟล์ index.html
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { sender: 'Other User', message: msg });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
