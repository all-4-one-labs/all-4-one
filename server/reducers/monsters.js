const initialState = [];

const UPDATE_MONSTERS = 'UPDATE_MONSTERS';
const RESET_MONSTERS = 'RESET_MONSTERS'

const updateMonsters = (monsterArray) => ({
  type: UPDATE_MONSTERS,
  monsterArray
});

const resetMonsters = () => ({
  type: RESET_MONSTERS
})

const monsterReducers = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_MONSTERS:
      newState = action.monsterArray;
      break;
    case RESET_MONSTERS:
      return initialState
    default: return state;
  }
  return newState;
};

module.exports = {updateMonsters, monsterReducers, resetMonsters};
