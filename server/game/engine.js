const store = require('../store');

const broadcastGameState = (io) => {
   setInterval(() => {
    // console.log('4-Server: Emitting state', store.getState())
    let state = store.getState()
    io.emit('player_data', state)
  }, 1000 / 30)
}

module.exports = { broadcastGameState }
