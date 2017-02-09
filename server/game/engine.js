const store = require('../store');
const {timerTick} = require('../reducers/engine')
const { reset } = require('../reducers/index.js')
const { resetState } = require('../reducers/resetReducer.js')

//hacky solution for now
let timerID
let broadcastID

const endgame = (io, winMessage) => {
  console.log('BEFORE',store.getState())
  clearInterval(timerID)
  clearInterval(broadcastID)
  store.dispatch(resetState())
  io.emit('end_game', winMessage);
  // store.dispatch(resetPlayers(false, 0))
  // store.dispatch(reset())
  console.log('AFTER', store.getState())
};


const broadcastGameState = (io) => {
  // console.log('broadcast')
  broadcastID = setInterval(() => {
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
  // console.log('gameTimer')
  let timer = duration, minutes, seconds;
  // console.log(timer)
    timerID = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      store.dispatch(timerTick(minutes, seconds));

      if (--timer < 0) {
        endgame(io, 'SURVIVORS WIN');
        clearInterval(timerID);
      }
  }, 1000);
};

//this function will be called when enough players have connected

const startgame = (io) => {
  console.log('startgame')
  //this is copied from the server file. when this is fully implemented,
  //it can be removed from there
  let time = 10 * 60;
  gameTimer(time, io);
  broadcastGameState(io);
};

module.exports = { broadcastGameState, startgame, endgame };
