const store = require('./store');
const {playerMove, removePlayer} = require('./reducers/players')

const listeners = function(io, socket){

  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  socket.on('playerMove', (data) => {
    store.dispatch(playerMove(socket.id, data))
  })

  socket.on('disconnect', function(){
    console.log('socket id ' + socket.id + ' has disconnected.')
    store.dispatch(removePlayer(socket.id))
  })
}

module.exports = listeners
