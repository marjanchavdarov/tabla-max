const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.static('frontend'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let rooms = {};
let roomCounter = 1;

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Matchmaking: join or create room
  let assignedRoom = null;
  for (const room in rooms) {
    if (rooms[room].length < 2) {
      rooms[room].push(socket.id);
      assignedRoom = room;
      break;
    }
  }

  if (!assignedRoom) {
    assignedRoom = 'room-' + roomCounter++;
    rooms[assignedRoom] = [socket.id];
  }

  socket.join(assignedRoom);
  socket.room = assignedRoom;
  console.log(`${socket.id} joined ${assignedRoom}`);

  // Notify both players
  if (rooms[assignedRoom].length === 2) {
    io.to(assignedRoom).emit('start_game', { room: assignedRoom });
  }

  // Dice roll event
  socket.on('roll_dice', (data) => {
    socket.to(socket.room).emit('opponent_roll', data);
  });

  // Dice selection event
  socket.on('select_dice', (data) => {
    socket.to(socket.room).emit('opponent_select', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
    if (socket.room && rooms[socket.room]) {
      rooms[socket.room] = rooms[socket.room].filter(id => id !== socket.id);
      if (rooms[socket.room].length === 0) {
        delete rooms[socket.room];
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Tabla Max server running on http://localhost:3000');
});