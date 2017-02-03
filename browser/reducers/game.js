const initialState = {}

const UPDATE_TIME = 'UPDATE_TIME'

export const updateTime = (minutes, seconds) => ({
  type: UPDATE_TIME,
  minutes,
  seconds
})

export default (state = initialState, action) => {
  let newState
  switch (action.type) {
    case UPDATE_TIME:
      // console.log(action) //object update time minutes undefined seconds undefined
      
      newState = action.minutes + ':' + action.seconds
      break
    default: return state
  }
  return newState
}
