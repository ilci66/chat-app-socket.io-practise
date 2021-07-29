const path = require('path');
// need to create the server using http
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
require('dotenv').config();

const port = process.env.PORT || 3000;
console.log(process.env.PORT)




const app = express();
const server = http.createServer(app);
const io = socketio(server);


//serving the static is very important and I keep forgetting;
app.use(express.static(path.join(__dirname, public)));

app.listen(port, () => console.log(`app is live on port: ${port}`))