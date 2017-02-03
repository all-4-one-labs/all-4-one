const initialState = {players: {} };
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
      delete newState.players[action.id];
      break;
    case RECEIVE_CLIENT_DATA:
      newState.players[action.id] = action.data
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { playerReducers, removePlayer, receiveClientData };
