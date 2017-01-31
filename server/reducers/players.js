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
  newState = Object.assign({},state);
  switch (action.type) {
    case PLAYER_MOVE:
      newState[action.id] = Object.assign({}, action.data);
      return newState;
    case REMOVE_PLAYER:
      newState[action.id] = Object.assign({delete:1});
      return newState;
    default:
      return state;
  }
}


module.exports = { playerReducers, playerMove, removePlayer }
