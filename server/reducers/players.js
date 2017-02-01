const initialState = {};
const PLAYER_MOVE = 'PLAYER_MOVE';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const DAMAGE_PLAYER = 'DAMAGE_PLAYER';

const playerMove = (id, data) => ({
  type: PLAYER_MOVE,
  id,
  data
});

const removePlayer = id => ({
  type: REMOVE_PLAYER,
  id
});

const damagePlayer = (id, data) => ({
  type: DAMAGE_PLAYER,
  id,
  data
});

const playerReducers = (state = initialState, action) => {
  let newState = Object.assign({},state);
  switch (action.type) {
    case PLAYER_MOVE:
      newState[action.id] = Object.assign({}, {health: 100}, state[action.id], action.data);
      break;
    case REMOVE_PLAYER:
      delete newState[action.id];
      break;
    case DAMAGE_PLAYER:
      newState[action.id] = Object.assign({}, {health: 100}, state[action.id], action.data);
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { playerReducers, playerMove, removePlayer, damagePlayer }
