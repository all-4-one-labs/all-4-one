const initialState = {};

const UPDATE_MONSTERS = 'UPDATE_MONSTERS';

export const updateMonsters = (monsterObject) => ({
  type: UPDATE_MONSTERS,
  monsterObject
});

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_MONSTERS:
      newState = action.monsterObject;
      break;
    default: return state;
  }
  return newState;
};
