const { startgame } = require('./game/engine')
const listeners = require('./listeners')

var path, {resolve} = require('path');

const http = require('http');
const server = http.createServer();

const express = require('express');
const app = express();

const socketio = require('socket.io');

const store = require('./store')
const { addSurvivor, gmExist } = require('./reducers/engine');

server.on('request', app);

// creates a new connection server for web sockets and integrates
// it into our HTTP server
// this needs to be below the server.on('request', app) so that our
// express app takes precedence over our socekt server for typical
// HTTP requests
const io = socketio(server);

// // use socket server as an event emitter in order to listen for new connctions
io.on('connection', (socket) => {
listeners(io, socket)});

let gmPlayer = store.getState().gmExist
console.log(store.getState())
app.get('/gmjoinrequest', (req, res) => {
  console.log('in join req')
  if (gmPlayer) {
    res.send(gmPlayer);
  } else {
    console.log('in else')
    res.send(gmPlayer);
    startgame(io);
    store.dispatch(gmExist(true))
    console.log(store.getState().gmExist)
  }
});

let numSurvivors = store.getState().numSurvivors
app.get('/survivorjoinrequest', (req, res) => {
  store.dispatch(addSurvivor)
  if (numSurvivors > 4) res.send(true);
  else res.send(false);
});

app.use(express.static(resolve(__dirname, '..', 'public')))

app.get('/', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

server.listen(process.env.PORT || 4020, function () {
    console.log('The server is listening on port ' + 4020/*TODO: fix this: process.env.PORT ? process.env.PORT : 4020*/);
});
