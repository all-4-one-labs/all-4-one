const store = require('./store');
const { removePlayer, receiveClientData } = require('./reducers/players');
// const { monsterMove } = require('./reducers/monsters');

const listeners = function(io, socket){

  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  // socket.on('playerMove', (data) => {
  //   store.dispatch(playerMove(socket.id, data));
  // });

  //  socket.on('playerShoot', (data) => {
  //   store.dispatch(playerShoot(socket.id, data));
  // });

  // socket.on('changeDirection', (data) => {
  //   store.dispatch(playerMove(socket.id, data));
  // });

  socket.on('disconnect', function(){
    console.log('socket id ' + socket.id + ' has disconnected.');
    store.dispatch(removePlayer(socket.id));
  });

  // socket.on('damage', function(data) {
  //   store.dispatch(damagePlayer(socket.id, data));
  // });

  // socket.on('monsterMove', function(data) {
    // store.dispatch(monsterMove(socket.id, data));
  // });

  socket.on('send_all_data', (data) => {
    if (data.gameMode === 'survivor') {
      console.log('s')
      store.dispatch(receiveClientData(socket.id, data));
    } else {
      console.log('g')
      //store.dispatch(monsterdata)
    }
  })
}

module.exports = listeners;
