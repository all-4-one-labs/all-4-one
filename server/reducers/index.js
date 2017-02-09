const {combineReducers} = require('redux');

const players = require('./players.js').playerReducers;
const monsters = require('./monsters.js').monsterReducers;
const engine = require('./engine.js').engineReducers;
const resetReducer = require('./resetReducer.js').resetReducer;

const RESET = 'RESET'

const reset = () => ({
  type: RESET
});

const appReducer = combineReducers({
  players,
  monsters,
  engine,
  resetReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') state = undefined
  return appReducer(state, action)
}

module.exports = { appReducer, reset }
