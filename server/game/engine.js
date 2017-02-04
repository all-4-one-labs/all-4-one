const store = require('../store');
const {timerTick} = require('../reducers/engine')

const broadcastGameState = (io) => {
   setInterval(() => {
    let state = store.getState();
    // console.log(state)
    io.emit('game_data', state);
  }, 1000 / 60); 
};

//currently not implemented on the front end
//also, this function will need to 'restart' the game for the server eventually
const endgame = (io) => {
  io.emit('end_game', {survivorWin: true})
}

//duration is in seconds
const gameTimer = (duration, io) => {
    let timer = duration, minutes, seconds;
    let tick = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        store.dispatch(timerTick(minutes, seconds))

        if (--timer < 0) {
            endgame(io)
            clearInterval(tick);
        }
    }, 1000);
}


module.exports = { broadcastGameState, gameTimer }

