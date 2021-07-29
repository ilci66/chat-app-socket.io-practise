const path = require('path');
// need to create the server using http
//in order to use socket.io
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log("this is the socket", socket)
})

//serving the static is very important and I keep forgetting;
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`app is live on port: ${port}`))