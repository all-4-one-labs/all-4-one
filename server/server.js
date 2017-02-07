const { broadcastGameState, gameTimer } = require('./game/engine')
const listeners = require('./listeners')

var path, {resolve} = require('path');

const http = require('http');
const server = http.createServer();

const express = require('express');
const app = express();

const socketio = require('socket.io');

server.on('request', app);

// creates a new connection server for web sockets and integrates
// it into our HTTP server 
// this needs to be below the server.on('request', app) so that our
// express app takes precedence over our socekt server for typical
// HTTP requests
const io = socketio(server);

// // use socket server as an event emitter in order to listen for new connctions
io.on('connection', (socket) => {
listeners(io, socket)})

broadcastGameState(io)

let time = 2 * 60
gameTimer(time, io)

app.use(express.static(resolve(__dirname, '..', 'public')))

app.get('/', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

server.listen(process.env.PORT || 4020, function () {
    console.log('The server is listening on port ' + 4020/*TODO: fix this: process.env.PORT ? process.env.PORT : 4020*/);
});
