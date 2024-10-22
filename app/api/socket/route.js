// pages/api/socket.js
import { Server } from 'socket.io';

let io;

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      path: "/api/socketio",  // Use a custom path to avoid conflicts
      transports: ['websocket'],  // Force WebSocket transport if necessary
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  res.end();
}
