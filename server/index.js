var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

io.on('connection', function(socket) {
  console.log('A new client has connected!');
  console.log(socket.id);
  socket.on('disconnect', function() {
    console.log('Goodbye! :(');
  })
  // socket.on('draw', function(start, end, color){
  //   socket.broadcast.emit('sendDraw', start, end, color);
  // })
});

server.listen(4020, function () {
    console.log('The server is listening on port 4020!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
