const path = require('path');
// need to create the server using http
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
require('dotenv').config();

const port = process.env.PORT || 3000;
console.log(process.env.PORT)




const app = express();
