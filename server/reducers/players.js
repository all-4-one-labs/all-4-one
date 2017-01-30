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
  switch (action.type) {
    case PLAYER_MOVE:
      newState = Object.assign({}, state)
      newState[action.id] = Object.assign({}, state[action.id], action.data)
      // console.log('3-Server: Player Reducer', action, newState)
      return newState
    case REMOVE_PLAYER:
      return state
    default:
      return state
  }
}


module.exports = { playerReducers, playerMove, removePlayer }
