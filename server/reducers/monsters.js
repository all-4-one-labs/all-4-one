const initialState = {};
const MONSTER_MOVE = 'MONSTER_MOVE';


const monsterMove = (id, data) => ({
  type: MONSTER_MOVE,
  id,
  data
});

const monstersReducers = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case MONSTER_MOVE:
      newState = Object.assign( {}, state, action.data);
      break;
    default:
      return state;
  }
  return newState;
}


module.exports = { monstersReducers, monsterMove }
