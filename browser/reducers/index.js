import {combineReducers} from 'redux';
import players from './players.js';
import gameMode from './gameMode.js';
import game from './game.js'

export default combineReducers({
  players,
  gameMode,
  game
});

