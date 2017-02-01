const store = require('../store');

const broadcastGameState = (io) => {
   setInterval(() => {
    let state = store.getState();
    io.emit('player_data', state);
  }, 1000 / 30)
}

module.exports = { broadcastGameState }
