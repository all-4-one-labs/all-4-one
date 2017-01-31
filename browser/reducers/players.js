//Initial State
const initialState = {};

//Action Types
const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';


//Action Creators
export const receivePlayerdata = (player) => ({
  type: RECEIVE_PLAYERS,
  player
});

//Reducers
export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_PLAYERS:
      newState = Object.assign({}, state, action.player);
      break;
    default: return state;
  }
  return newState;
};
