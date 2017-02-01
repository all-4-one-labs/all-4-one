//Initial State
const initialState = {};

//Action Types
const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';


//Action Creators
export const receivePlayerdata = (players) => ({
  type: RECEIVE_PLAYERS,
  players
});

//Reducers
export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_PLAYERS:
      newState = Object.assign({}, action.players);
      break;
    default: return state;
  }
  return newState;
};
