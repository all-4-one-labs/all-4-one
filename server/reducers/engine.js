const initialState = { numSurvivors: 0, gmExist: false }
const TIMER_TICK = 'TIMER_TICK'
const ADD_SURVIVOR = 'ADD_SURVIVOR'
const GM_EXIST = 'GM_EXIST'
const RESET_ENGINE = 'RESET_ENGINE'

const timerTick = (minutes, seconds) => ({
  type: TIMER_TICK,
  minutes,
  seconds
})

const resetEngine = () => ({
  type: RESET_ENGINE
})

const addSurvivor = () => ({
  type: ADD_SURVIVOR
})

const gmExist = (gmExist) => ({
  type: GM_EXIST,
  gmExist
})

const engineReducers = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case TIMER_TICK:
      newState = Object.assign({}, state, {minutes: action.minutes, seconds: action.seconds})
      break
    case ADD_SURVIVOR:
      newState = Object.assign({}, state, {numSurvivors: state.numSurvivors++})
      break
    case GM_EXIST:
      newState = Object.assign({}, state, {gmExist: action.gmExist})
      break
    case RESET_ENGINE:
      return initialState
    default:
      return state
  }
  return newState
}

module.exports = {timerTick, addSurvivor, gmExist, engineReducers, resetEngine}
