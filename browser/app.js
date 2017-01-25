var socket = io(window.location.origin);

socket.on('connect', function() {
  console.log('I have made a persistent two-way connection to the server!')
});

// whiteboard.on('draw', function(start, end, color){
//   socket.emit('draw', start, end, color);
// });

// socket.on('sendDraw', function(start, end, color) {
//   whiteboard.draw(start, end, color, false);
// })