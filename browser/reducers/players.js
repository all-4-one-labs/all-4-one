//Initial State
const initialState = {};

//Action Types
const RECEIVE_SERVER_PLAYER = 'RECEIVE_SERVER_PLAYER';
const UPDATE_POSITION = 'UPDATE_POSITION';
const SURVIVOR_FIRE = 'SURVIVOR_FIRE';
const SURVIVOR_SPLASH = 'SURVIVOR_SPLASH';
const UPDATE_HEALTH = 'UPDATE_HEALTH';
const UPDATE_PLAYER_TYPE = 'UPDATE_PLAYER_TYPE';

//Action Creators
export const receiveServerPlayer = (serverPlayer) => ({
  type: RECEIVE_SERVER_PLAYER,
  serverPlayer
});

export const updatePosition = (positionData) => ({
  type: UPDATE_POSITION,
  positionData
})

export const survivorFire = (fireData) => ({
  type: SURVIVOR_FIRE,
  fireData
})

export const updateHealth = (health) => ({
  type: UPDATE_HEALTH,
  health
})

export const updatePlayerType = (playerType) => ({
  type: UPDATE_PLAYER_TYPE,
  playerType
})

export const survivorSplash = (splashData) => ({
  type: SURVIVOR_SPLASH,
  splashData
})

//Reducers
export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SERVER_PLAYER:
      // console.log(state)
      newState = Object.assign({}, state, action.serverPlayer);
      // console.log(action.serverPlayer)
      break;
    case UPDATE_POSITION:
      newState = Object.assign({}, state, action.positionData);
      break;
    case SURVIVOR_FIRE:
      newState = Object.assign({}, state, action.fireData);
      break; 
    case SURVIVOR_SPLASH:
      newState = Object.assign({}, state, action.splashData);
      break;
    case UPDATE_HEALTH:
      newState = Object.assign({}, state, action.health);
      // console.log('newState', newState);
      break;
    case UPDATE_PLAYER_TYPE:
      newState = Object.assign({}, state, action.playerType);
      break;
    default: return state;
  }
  return newState;
};
