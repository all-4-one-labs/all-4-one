import store from '../store'
import {recievePlayerData} from '../reducers/players.js'

export default socket => {

  // socket.on('connect', function(){
  //   console.log('I have made a persistent two-way connection to the server!');
  // })
  
  socket.on('player_data', state => {
    store.dispatch(recievePlayerData(state))
  })

}
