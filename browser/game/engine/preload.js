import store from '../../store.js';
import {receiveGameMode} from '../../reducers/gameMode.js';

export default function preload() {
  this.load.spritesheet('gunner', 'assets/Survivors/gunner.png', 32, 32);
  this.load.spritesheet('mage', 'assets/Survivors/mage.png', 32, 32);
  this.load.spritesheet('shotgunner', 'assets/Survivors/shotgunner.png', 32, 32);
  this.load.spritesheet('explosion', 'assets/Misc/explosionFull.png', 64, 64);
  this.load.image('bullet', 'assets/Misc/bullet.png');
  this.load.image('sgbullet', 'assets/Misc/bulletRed.png');
  this.load.spritesheet('mummyC', 'assets/Monsters/MummyC.png', 16, 16);
  this.load.spritesheet('lurkerC', 'assets/Monsters/LurkerC.png', 16, 16);
  this.load.spritesheet('slimeB', 'assets/Monsters/SlimeB.png', 16, 16);
  this.load.spritesheet('sentryC', 'assets/Monsters/SentryC.png', 16, 16);
  this.load.spritesheet('earthSmallerB', 'assets/Monsters/EarthSmallerB.png', 16, 16);
  this.load.tilemap('tilemap', 'assets/Tilemap/tesseract.json', null, Phaser.Tilemap.TILED_JSON);
  this.load.image('tileset', 'assets/Tilemap/tilesets/terrain_atlas.png');
  this.load.image('crosshair', 'assets/Misc/crosshair.png');
  this.load.image('dock', 'assets/Misc/dock.png');

  //sound test
  this.load.audio('blaster', 'assets/Sounds/blaster.mp3');
  this.load.audio('explosionsound', 'assets/Sounds/explosions.mp3');
  this.load.audio('epicbg', 'assets/Sounds/epicbg.mp3');
  this.load.audio('darknessbg', 'assets/Sounds/darkness.mp3');

  store.dispatch(receiveGameMode(sessionStorage.getItem('mode')));

}

