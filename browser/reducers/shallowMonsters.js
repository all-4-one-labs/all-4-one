const initialState = []

const RECEIVE_MONSTER_DATA = 'RECEIVE_MONSTER_DATA'

export const receiveMonsterData = (data) => ({
  type: RECEIVE_MONSTER_DATA,
  data
})

export default (state = initialState, action) => {
  let newState
  switch (action.type) {
    case RECEIVE_MONSTER_DATA:
      // console.log(data)
      newState = action.data
      break
    default: return state
  }
  return newState
}
