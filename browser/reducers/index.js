import {combineReducers} from 'redux';
import players from './players.js';
import gameMode from './gameMode.js';
import game from './game.js'
import monsters from './monsters.js'
import shallowMonsters from './shallowMonsters.js'

export default combineReducers({
  players,
  gameMode,
  game, 
  monsters, 
  shallowMonsters
});

