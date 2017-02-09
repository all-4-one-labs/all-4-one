const {combineReducers} = require('redux');

const players = require('./players.js').playerReducers;
const monsters = require('./monsters.js').monsterReducers;
const engine = require('./engine.js').engineReducers;

module.exports = combineReducers({
  players,
  monsters,
  engine
});

//IMPLEMENT TO RESET
// const appReducer = combineReducers({
//   players,
//   monsters,
//   engine
// });

// module.exports = (state, action) => {
//   if (action.type === 'RESET')
//     state = undefined
//   return rootReducer(state, action)
// }