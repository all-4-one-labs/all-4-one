const initialState = { numSurvivors: 0, gmExist: false }
const TIMER_TICK = 'TIMER_TICK'
// const RESET_PLAYERS = 'RESET_PLAYERS'
const ADD_SURVIVOR = 'ADD_SURVIVOR'
const GM_EXIST = 'GM_EXIST'

const timerTick = (minutes, seconds) => ({
  type: TIMER_TICK,
  minutes,
  seconds
})

// const resetPlayers = (gmExist, numSurvivors) => ({
//   type: RESET_PLAYERS,
//   gmExist,
//   numSurvivors
// })

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
      newState = Object.assign({}, {minutes: action.minutes, seconds: action.seconds})
      break
    // case RESET_PLAYERS:
    //   newState = Object.assign({}, {gmExist: action.gmExist, numSurvivors: action.numSurvivors})
    //   break
    case ADD_SURVIVOR:
      newState = Object.assign({}, {numSurvivors: state.numSurvivors++})
      break
    case GM_EXIST:
      newState = Object.assign({}, {gmExist: action.gmExist})
      break
    default:
      return state
  }
  return newState
}

module.exports = {timerTick, addSurvivor, gmExist, engineReducers}
