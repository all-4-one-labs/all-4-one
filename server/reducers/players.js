const initialState = {}
const PLAYER_MOVE = 'PLAYER_MOVE'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
let newState

const playerMove = (id, data) => ({
  type: PLAYER_MOVE,
  id,
  data
})

const removePlayer = id => ({
  type: REMOVE_PLAYER,
  id
})

const playerReducers = (state = initialState, action) => {
  let newState = Object.assign({},state);
  switch (action.type) {
    case PLAYER_MOVE:
      newState[action.id] = Object.assign({}, action.data);
      break;
    case REMOVE_PLAYER:
      newState[action.id] = Object.assign({delete: 1});
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { playerReducers, playerMove, removePlayer }
