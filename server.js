const path = require('path');
// need to create the server using http
//in order to use socket.io
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const io = socketio(server);
// console.log(io)

//serving the static is very important and I keep forgetting;
app.use(express.static(path.join(__dirname, "public")));

const botName = 'Chat bot'

// Run when client connects
io.on('connection', socket => {
  console.log('on connection, socket >>>',socket)
  socket.on('joinRoom', ({ username, room }) => {
    console.log(`${username} joining ${room}`)
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Chat App!'));

    // Broadcast when a user connects to the room
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app is live on port: ${port}`))