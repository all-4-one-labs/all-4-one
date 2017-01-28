

var path, {resolve} = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io'); 

server.on('request', app);


// creates a new connection server for web sockets and integrates
// it into our HTTP server 
// this needs to be below the server.on('request', app) so that our
// express app takes precedence over our socekt server for typical
// HTTP requests
var io = socketio(server);

//put state here for now. this needs to be redux (or something) eventually
let players = {}

// // use socket server as an event emitter in order to listen for new connctions
io.on('connection', function(socket){

  players[socket.id] = {}
  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  //event that runs anytime a socket disconnects
  socket.on('disconnect', function(){
    console.log('socket id ' + socket.id + ' has disconnected. : (');
    delete players[socket.id] //maybe? this operator is allegedly very slow and might not be necessary, especially after we migrate to redux
  })

  socket.on('move', (data) => {
    players[socket.id].position = data
    //socket.broadcast.emit('sendMove', data)
  })

  //emit player data 30 times per second
  //this will eventually become it's own function
  //should this be outside of io.on?
  setInterval(() =>{
    socket.emit('player_data', players)
  }, 1000 / 30)
})

app.use(express.static(resolve(__dirname, '..', 'public')))

app.get('/', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

server.listen(process.env.PORT || 4020, function () {
    console.log('The server is listening on port ' + 4020/*TODO: fix this: process.env.PORT ? process.env.PORT : 4020*/);
});




