const initialState = {};
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
  let newState;
  switch (action.type) {
    case REMOVE_PLAYER:
      delete newState[action.id];
      break;
    case RECEIVE_CLIENT_DATA:
      console.log('action',action)
      newState = Object.assign( {}, state, /*state[action.id],*/ action.data );
      // console.log('newState', newState)
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { playerReducers, removePlayer, receiveClientData };
