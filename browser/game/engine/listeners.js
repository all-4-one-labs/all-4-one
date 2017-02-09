import store from '../../store'
import {receiveServerPlayer} from '../../reducers/players.js'
import {updateTime, endGame} from '../../reducers/game.js'
import {receiveMonsterData} from '../../reducers/shallowMonsters.js'

export default socket => {

  socket.on('game_data', data => {
    console.log(data)
    store.dispatch(receiveServerPlayer(data.players));
    store.dispatch(updateTime(data.engine.minutes, data.engine.seconds));
    store.dispatch(receiveMonsterData(data.monsters));
  });

  socket.on('end_game', data => {
    store.dispatch(endGame(data))
    });
};

