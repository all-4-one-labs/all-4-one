const {combineReducers} = require ('redux')
const players = require('./players.js').playerReducers

module.exports = combineReducers({
  players
});
