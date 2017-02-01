import {combineReducers} from 'redux';
import players from './players.js';
import gameMode from './gameMode.js';

export default combineReducers({
  players,
  gameMode,
});

