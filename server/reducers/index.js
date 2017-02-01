const {combineReducers} = require ('redux')
const players = require('./players.js').playerReducers
const engine = require('./engine.js').engineReducers

module.exports = combineReducers({
  players, engine
});
