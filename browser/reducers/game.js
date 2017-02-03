const initialState = {time: '15:00', timeUp: false}

const UPDATE_TIME = 'UPDATE_TIME'
const END_GAME = 'END_GAME'

export const updateTime = (minutes, seconds) => ({
  type: UPDATE_TIME,
  minutes,
  seconds
})

export const endGame = (data) => ({
  type: END_GAME,
  data
})

export default (state = initialState, action) => {
  let newState
  switch (action.type) {
    case UPDATE_TIME:
      newState = Object.assign({}, state, {time: action.minutes + ':' + action.seconds})
      break
    case END_GAME:
      newState = Object.assign({}, state, {timeUp: true})
      break
    default: return state
  }
  return newState
}
