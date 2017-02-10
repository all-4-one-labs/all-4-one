const initialState = {
  players: {
    players: {},
    gmWinOnState: false
   },
  monsters: [],
  engine:{  
    numSurvivors: 0,
    gmExist: false
  },
}

const RESET_STATE = 'RESET_STATE';

const resetState = () => ({
  type: RESET_STATE
})

const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return initialState
    default:
      return state;
  }
}

module.exports = { resetReducer, resetState }