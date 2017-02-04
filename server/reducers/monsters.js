const initialState = []

const UPDATE_MONSTERS = 'UPDATE_MONSTERS'

const updateMonsters = (monsterArray) => ({
  type: UPDATE_MONSTERS,
  monsterArray
})

const monsterReducers = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case UPDATE_MONSTERS:
      console.log('monster reducer', action)
      newState = action.monsterArray
      break
    default: return state
  }
  return newState
}

module.exports = {updateMonsters, monsterReducers}