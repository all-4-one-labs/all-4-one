//Initial State
const initialState = '';

//Action Types
const RECEIVE_GAMEMODE = 'RECEIVE_GAMEMODE';


//Action Creators
export const receiveGameMode = (gamemode) => ({
  type: RECEIVE_GAMEMODE,
  gamemode
});

//Reducers
export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_GAMEMODE:
      newState = action.gamemode;
      break;
    default: return state;
  }
  return newState;
};
