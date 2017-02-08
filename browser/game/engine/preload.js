import store from '../../store.js';
import {receiveGameMode} from '../../reducers/gameMode.js';

export default function preload() {
  this.load.spritesheet('survivorA', 'assets/Survivors/SurvivorA.png', 32, 32);
  this.load.spritesheet('survivorB', 'assets/Survivors/SurvivorB.png', 32, 32);
  // this.load.spritesheet('swordUpDown', 'assets/Survivors/swordUpDown.png', 16, 16);
  // this.load.spritesheet('swordLeftRight', 'assets/Survivors/swordLeftRight.png', 16, 16);
  this.load.spritesheet('explosion', 'assets/explosionFull.png', 64, 64);
  this.load.image('bullet', 'assets/bullet.png');
  this.load.spritesheet('mummyC', 'assets/UsedPixelMobs/MummyC.png', 16, 16);
  this.load.spritesheet('lurkerC', 'assets/UsedPixelMobs/LurkerC.png', 16, 16);
  this.load.spritesheet('slimeB', 'assets/UsedPixelMobs/SlimeB.png', 16, 16);
  this.load.spritesheet('sentryC', 'assets/UsedPixelMobs/SentryC.png', 16, 16);
  this.load.spritesheet('earthSmallerB', 'assets/UsedPixelMobs/EarthSmallerB.png', 16, 16);
  this.load.tilemap('tilemap', 'tilemap/tesseract.json', null, Phaser.Tilemap.TILED_JSON);
  this.load.image('tileset', 'tilemap/tilesets/terrain_atlas.png');
  this.load.image('crosshair', 'assets/crosshair.png');
  this.load.image('dock', 'assets/dock.png');

  //sound test
  this.load.audio('blaster', 'assets/blaster.mp3');
  this.load.audio('epicbg', 'assets/epicbg.mp3');
  this.load.audio('darknessbg', 'assets/darkness.mp3');

  store.dispatch(receiveGameMode(sessionStorage.getItem('mode')));

}

