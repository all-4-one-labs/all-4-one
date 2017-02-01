const initialState = {}
const TIMER_TICK = 'TIMER_TICK'

const timerTick = (minutes, seconds) => ({
  type: TIMER_TICK,
  minutes,
  seconds
})

const engineReducers = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case TIMER_TICK:
      newState = Object.assign({}, {minutes: action.minutes, seconds: action.seconds});
      break;
    default:
      return state;
  }
  return newState;
}

module.exports = {timerTick, engineReducers}
