const initial state = {}

const UPDATE_TIME = 'UPDATE_TIME'

export const updateTime = (minutes, seconds) => ({
  type: UPDATE_TIME,
  minutes,
  seconds
})