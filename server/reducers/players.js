const isEmpty = require('lodash/isEmpty')
const initialState = {players: {}, gmWinOnState: false };
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const RECEIVE_CLIENT_DATA = 'RECEIVE_CLIENT_DATA';

const removePlayer = id => ({
  type: REMOVE_PLAYER,
  id
});

const receiveClientData = (id, data) => ({
  type: RECEIVE_CLIENT_DATA,
  id,
  data
})

const playerReducers = (state = initialState, action) => {
  let newState = Object.assign( {}, state)
  switch (action.type) {
    case REMOVE_PLAYER:
      //this should only happen if the game has started
      //currently the gameMode only exists on the survivor. putting off fixing this until backend stuff is implemented
      //once it's fixed this will be '...action[id].gameMode==='survivor''
      if (newState.players[action.id]) {
        delete newState.players[action.id];
        if (isEmpty(newState.players)) {
          newState.gmWinOnState = true
        }
      } else {
        newState.survivorWinOnState = true
      }
      break;
    case RECEIVE_CLIENT_DATA:
      console.log('receive client data')
      if (newState.players[action.id] && action.data.health <= 0){
        delete newState.players[action.id];
        if (isEmpty(newState.players)) {
          newState.gmWinOnState = true
        }
        break;
      }
      newState.players[action.id] = action.data
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { playerReducers, removePlayer, receiveClientData };
