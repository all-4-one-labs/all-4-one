const initialState = {}

const UPDATE_TIME = 'UPDATE_TIME'

export const updateTime = (minutes, seconds) => ({
  type: UPDATE_TIME,
  minutes,
  seconds
})

export default (state = initialState, action) => {
  let newState
  switch(action.type) {
    case UPDATE_TIME:
      newState = Object.assign({}, action.minutes, action.secondsß)
      break
    default: return state
  }
}