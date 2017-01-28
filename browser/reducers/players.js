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
  switch (action.type) {
    case RECEIVE_PLAYERS:
      return action.players;
    default: return state;
  }
}
