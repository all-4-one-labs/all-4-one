const store = require('./store');
const { removePlayer, receiveClientData } = require('./reducers/players');
const { updateMonsters } = require('./reducers/monsters');

const listeners = function(io, socket){

  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  socket.on('disconnect', function(){
    console.log('socket id ' + socket.id + ' has disconnected.');
    store.dispatch(removePlayer(socket.id));
  });

  socket.on('send_all_data', (data) => {
    if (data.gameMode === 'survivor') {
      store.dispatch(receiveClientData(socket.id, data));
    } else {
      store.dispatch(updateMonsters(data.monsters));
    }
  })
}

module.exports = listeners;
