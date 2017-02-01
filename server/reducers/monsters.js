const initialState = {};
const CREATE_MONSTERS = 'CREATE_MONSTERS';


const createMonsters = (id, arr) => ({
  type: CREATE_MONSTERS,
  id,
  arr
});

const monstersReducers = (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case CREATE_MONSTERS:
      newState[action.id] = Object.assign( {}, player, state[action.id], action.data);
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { monstersReducers, createMonsters }
