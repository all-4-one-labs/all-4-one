import store from '../store'
import {receivePlayerdata} from '../reducers/players.js'

export default socket => {

  socket.on('player_data', data => {
    // console.log('5-Client: Recieveing State', data)
    store.dispatch(receivePlayerdata(data));
  });

}
