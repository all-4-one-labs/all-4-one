import store from '../../store'
import {receiveServerPlayer} from '../../reducers/players.js'
import {updateTime} from '../../reducers/game.js'

export default socket => {

  socket.on('game_data', data => {
    // console.log(data)
    store.dispatch(receiveServerPlayer(data.players));
    store.dispatch(updateTime(data.minutes, data.seconds))
  });

  socket.on('end_game', data => {
    if (data.survivorWin) {
      //phaser freeze, display message on screen, redirect to somewhere
    }
    });
};

