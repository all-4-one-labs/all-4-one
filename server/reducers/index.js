const {combineReducers} = require ('redux')

const players = require('./players.js').playerReducers;
const monsters = require('./monsters.js').monstersReducers;
const engine = require('./engine.js').engineReducers

module.exports = combineReducers({
  players,
  monsters,
  engine
});
