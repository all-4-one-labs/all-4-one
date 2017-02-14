const isEmpty = require('lodash/isEmpty')
const initialState = {players: {}, gmWinOnState: false };
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const RECEIVE_CLIENT_DATA = 'RECEIVE_CLIENT_DATA';
const RESET_PLAYERS = 'RESET_PLAYERS'

let blacklist = {}

const removePlayer = id => ({
  type: REMOVE_PLAYER,
  id
});

const receiveClientData = (id, data) => ({
  type: RECEIVE_CLIENT_DATA,
  id,
  data
})

const resetPlayers = () => ({
  type: RESET_PLAYERS
})

const playerReducers = (state = initialState, action) => {
  let newState = Object.assign( {}, state)
  switch (action.type) {
    case REMOVE_PLAYER:
      //this should only happen if the game has started
      //currently the gameMode only exists on the survivor. putting off fixing this until backend stuff is implemented
      //once it's fixed this will be '...action[id].gameMode==='survivor''
      if (newState.players[action.id]) {
        // console.log(newState.players[action.id])
        blacklist[action.id] = true
        delete newState.players[action.id]
        if (isEmpty(newState.players)) {
         newState.gmWinOnState = true
        }
      } else {
        console.log('it happened')
        newState.survivorWinOnState = true
      }
      break;
    case RECEIVE_CLIENT_DATA:
          if (!blacklist[action.id]) {
            if (newState.players[action.id] && action.data.health <= 0){
              blacklist[action.id] = true
              delete newState.players[action.id]
              if (isEmpty(newState.players)) {
                newState.gmWinOnState = true
              }
              break;
            }
            if (!isEmpty(action.data.heal)) {
              for (let id in action.data.heal) {
                newState.players[id].health = action.data.heal[id];
                delete action.data.heal[id];
              }
            }
            newState.players[action.id] = action.data
          }      
          break;
    case RESET_PLAYERS:
      return initialState
    default:
      return state;
  }
  return newState;
}


module.exports = { playerReducers, removePlayer, receiveClientData, resetPlayers };
