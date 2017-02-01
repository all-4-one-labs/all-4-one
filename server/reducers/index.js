const {combineReducers} = require ('redux')
const players = require('./players.js').playerReducers;
const monsters = require('./monsters.js').monstersReducers;

module.exports = combineReducers({
  players,
  monsters
});
