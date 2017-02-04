const initialState = []

const UPDATE_MONSTERS = 'UPDATE_MONSTERS'

export const updateMonsters = (monsterArray) => ({
  type: UPDATE_MONSTERS,
  monsterArray
})

export default (state = initialState, action) => {
  let newState
  switch (action.type) {
    case UPDATE_MONSTERS:
      newState = action.monsterArray
      break
    default: return state
  }
  return newState
}
