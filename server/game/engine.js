const store = require('../store');
const {timerTick} = require('../reducers/engine')

const broadcastGameState = (io) => {
   setInterval(() => {
    let state = store.getState();
    io.emit('player_data', state);
  }, 1000 / 30);
}

//duration is in seconds
const gameTimer = (duration, io) =>{
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        store.dispatch(timerTick(minutes, seconds))

        if (--timer < 0) {
            endgame(io)
            timer = duration;
        }
    }, 1000);
}

//currently not implemented on the front end
const endgame = (io) => {
  io.emit('end_game', {survivorwin: true})
}

module.exports = { broadcastGameState, gameTimer }

