const store = require('../store');
const {timerTick} = require('../reducers/engine')

const endgame = (io, teamThatWon) => {
  //this needs to also return the server to a 'game not currently started' state
  io.emit('end_game', teamThatWon);
};

const broadcastGameState = (io) => {
  setInterval(() => {
    let state = store.getState();
    io.emit('game_data', state);
    if (store.getState().players.survivorWinOnState) {
      endgame(io, 'SURVIVORS WIN')
    } else if (store.getState().players.gmWinOnState) {
      endgame(io, 'GAME MASTER WINS')
    }
  }, 1000 / 30);

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
        endgame(io, 'surv');
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

module.exports = { broadcastGameState, startgame, endgame };
