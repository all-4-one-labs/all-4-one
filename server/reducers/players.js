const initialState = {};
const PLAYER_MOVE = 'PLAYER_MOVE';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const DAMAGE_PLAYER = 'DAMAGE_PLAYER';
const PLAYER_SHOOT = 'PLAYER_SHOOT';

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

const playerShoot = (id, data) => ({
  type: PLAYER_SHOOT,
  id,
  data
});

const playerReducers = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  let player = {
    health: 100,
    bool: false
  };
  switch (action.type) {
    case PLAYER_MOVE:
<<<<<<< HEAD
      newState[action.id] = Object.assign({}, {health: 100}, state[action.id], action.data);
=======
      newState[action.id] = Object.assign( {}, player, state[action.id], action.data);
>>>>>>> 1f2db8a506dde3cb9435d48081ffe4ea2c20ca6e
      break;
    case REMOVE_PLAYER:
      delete newState[action.id];
      break;
    case DAMAGE_PLAYER:
      newState[action.id] = Object.assign( {}, player, state[action.id], action.data);
      break;
    case PLAYER_SHOOT:
      newState[action.id] = Object.assign( {}, player, state[action.id], action.data);
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { playerReducers, playerMove, removePlayer, damagePlayer , playerShoot}
