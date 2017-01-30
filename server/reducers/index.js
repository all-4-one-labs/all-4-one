import {combineReducers} from 'redux'
const players = require('./players.js').reducer

module.exports = combineReducers({
  players
})