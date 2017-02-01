import store from '../store.js';
import {receiveGameMode} from '../reducers/gameMode.js';

export default function preload() {
  this.load.image('ground', 'assets/sky.png');
  this.load.image('wall', 'assets/platform.png');
  this.load.spritesheet('dude', 'assets/PeopleSpriteSheet2.png', 32, 32);
  this.load.image('bullet', 'assets/bullet.png');
  this.load.spritesheet('monster', 'assets/MummyC.png', 16 , 16);
  //this.load.image('button', 'assets/utton.png');
  this.load.tilemap('tilemap', 'tilemap/tesseract.json', null, Phaser.Tilemap.TILED_JSON);
  this.load.image('tileset', 'tilemap/tilesets/terrain_atlas.png');

  store.dispatch(receiveGameMode(sessionStorage.getItem('mode')));

}

