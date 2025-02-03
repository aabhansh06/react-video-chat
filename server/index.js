import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(cors());

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default port
    methods: ["GET", "POST"]
  }
})

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')))
}

// Store connected users
const users = new Map()
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join', (username) => {
    users.set(socket.id, { username, id: socket.id })
    io.emit('users', Array.from(users.values()))
  });

  socket.on('create-room', roomId => {
    socket.join(roomId);
    rooms.set(roomId, [socket.id]);
  });

  socket.on('join-room', roomId => {
    if (rooms.has(roomId)) {
      socket.join(roomId);
      const usersInRoom = rooms.get(roomId);
      usersInRoom.push(socket.id);
      rooms.set(roomId, usersInRoom);
      
      socket.emit('all-users', usersInRoom.filter(id => id !== socket.id));
    }
  });

  socket.on('sending-signal', payload => {
    io.to(payload.userToSignal).emit('user-joined', {
      signal: payload.signal,
      callerId: payload.callerId
    });
  });

  socket.on('returning-signal', payload => {
    io.to(payload.callerId).emit('receiving-returned-signal', {
      signal: payload.signal,
      id: socket.id
    });
  });

  // Handle call signaling
  socket.on('callUser', ({ to, signal, from, name }) => {
    io.to(to).emit('callIncoming', { signal, from, name })
  })

  socket.on('answerCall', ({ to, signal }) => {
    io.to(to).emit('callAccepted', signal)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    users.delete(socket.id)
    io.emit('users', Array.from(users.values()))

    rooms.forEach((users, roomId) => {
      if (users.includes(socket.id)) {
        const updatedUsers = users.filter(id => id !== socket.id);
        if (updatedUsers.length === 0) {
          rooms.delete(roomId);
        } else {
          rooms.set(roomId, updatedUsers);
        }
        socket.to(roomId).emit('user-left', socket.id);
      }
    });
  });
});

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
