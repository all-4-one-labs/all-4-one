//Initial State
const initialState = {};

//Action Types
const RECEIVE_SERVER_PLAYER = 'RECEIVE_SERVER_PLAYER';
const RECEIVE_POSITION = 'RECEIVE_POSITION';
const RECEIVE_FIRE_DATA = 'RECEIVE_FIRE_DATA';
const RECEIVE_HEALTH = 'RECEIVE_HEALTH';
const RECEIVE_BOOL = 'RECEIVE_BOOL';



//Action Creators
export const receiveServerPlayer = (serverPlayer) => ({
  type: RECEIVE_SERVER_PLAYER,
  serverPlayer
});

export const receivePosition = (positionData) => ({
  type: RECEIVE_POSITION,
  positionData
})

export const receiveFireData = (fireData) => ({
  type: RECEIVE_FIRE_DATA,
  fireData
})

export const receiveHealth = (health) => ({
  type: RECEIVE_HEALTH,
  health
})

export const receiveBool = (bool) => ({
  type: RECEIVE_BOOL,
  bool
})

//Reducers
export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SERVER_PLAYER:
      newState = Object.assign({}, action.serverPlayer);
      break;
    case RECEIVE_POSITION:
      newState = Object.assign({}, state, action.positionData);
      break;
    case RECEIVE_FIRE_DATA:
      newState = Object.assign({}, state, action.fireData);
      break;
    case RECEIVE_HEALTH:
      newState = Object.assign({}, state, action.health);
      break;
    case RECEIVE_BOOL:
      newState = Object.assign({}, state, action.bool);
      break;
    default: return state;
  }
  return newState;
};
