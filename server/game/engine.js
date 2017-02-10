const store = require('../store');
const {timerTick, resetEngine} = require('../reducers/engine')
const {resetPlayers} = require('../reducers/players')
const {resetMonsters} = require('../reducers/monsters')

//hacky solution for now
//'for now'
let timerID
let broadcastID

const endgame = (io, winMessage) => {
  //this is currently not working as intended
  console.log(io.sockets.connected)
  for (let s in io.sockets.connected) {
    s.disconnected = true
  }
  clearInterval(timerID)
  clearInterval(broadcastID)
  store.dispatch(resetPlayers())
  store.dispatch(resetEngine())
  store.dispatch(resetMonsters())
  io.emit('end_game', winMessage);
  setTimeout(() => {
    store.dispatch(resetPlayers())
    store.dispatch(resetEngine())
    store.dispatch(resetMonsters())
  }, 10000)
  // setTimeout(() => console.log('after for real',store.getState()), 15000)


};


const broadcastGameState = (io) => {
  broadcastID = setInterval(() => {
    let state = store.getState();
    console.log('this is the state', state)
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
  store.dispatch(resetPlayers())
  store.dispatch(resetEngine())
  store.dispatch(resetMonsters())
  let time = 10 * 60;
  gameTimer(time, io);
  broadcastGameState(io);
};

module.exports = { broadcastGameState, startgame, endgame };
