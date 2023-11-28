// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3001;

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('sendMessage', (message) => {
        // 클라이언트로부터 받은 메시지를 다시 모든 클라이언트에게 전송
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});