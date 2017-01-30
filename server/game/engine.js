const store = require('../store');

const broadcastGameState = (io) => {
   setInterval(() => {
    let {players} = store.getState()
    io.emit('player_data', players)
  }, 1000 / 30)
}

module.exports = { broadcastGameState }
