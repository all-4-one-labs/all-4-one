const store = require('../store');
const {timerTick} = require('../reducers/engine')

const broadcastGameState = (io) => {
  setInterval(() => {
    let state = store.getState();
    console.log(state)
    io.emit('game_data', state);
  }, 1000 / 60);
};

const endgame = (io) => {
  //this needs to also return the server to a 'game not currently started' state
  io.emit('end_game', {survivorWin: true});
};

//duration is in seconds
const gameTimer = (duration, io) => {
  let timer = duration, minutes, seconds;
    let tick = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      store.dispatch(timerTick(minutes, seconds));

      if (--timer < 0) {
        endgame(io);
        clearInterval(tick);
      }
  }, 1000);
};

//this function will be called when enough players have connected

const startgame = (io) => {
  //this is copied from the server file. when this is fully implemented,
  //it can be removed from there
  let time = 10 * 60;
  gameTimer(time, io);
  broadcastGameState(io);
};

module.exports = { broadcastGameState, startgame };
