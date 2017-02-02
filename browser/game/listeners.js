import store from '../store'
import {receivePlayerdata} from '../reducers/players.js'

export default socket => {

  socket.on('player_data', data => {
    // console.log(data)
    store.dispatch(receivePlayerdata(data.players));
  });

  socket.on('end_game', data =>{
    if(data.survivorWin) {
      //phaser freeze, display message on screen, redirect to somewhere
    }
  })

};

