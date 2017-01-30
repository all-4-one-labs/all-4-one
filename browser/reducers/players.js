// KF: I don't see much actual state management going right now, so that should be a main focus going 
// forward. I know you guys already have that as a goal for the next couple days, so definitely try
// to get it more resolved ASAP.

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
