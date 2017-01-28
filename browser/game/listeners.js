import store from '../store'
import {receivePlayerdata} from '../reducers/players.js'

export default socket => {

  socket.on('player_data', state => {
    store.dispatch(receivePlayerdata(state))
  })

}
