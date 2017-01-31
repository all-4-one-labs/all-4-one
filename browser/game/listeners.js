import store from '../store'
import {receivePlayerdata} from '../reducers/players.js'

export default socket => {

  socket.on('player_data', data => {
    console.log(data.players);
    store.dispatch(receivePlayerdata(data.players));
  });

};

