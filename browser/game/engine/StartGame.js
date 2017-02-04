import create from './create.js';
import preload from './preload.js';
import update from './update.js';

let xSize, ySize;
if( sessionStorage.getItem('mode') === 'survivor' ) {
  xSize = 1280;
  ySize = 720;
} else if ( sessionStorage.getItem('mode') === 'gamemaster') {
  xSize = 1280; //3840
  ySize = 720; //2560
}

const game = new Phaser.Game(xSize, ySize, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
game.config.disableVisibilityChange = true;

export default game;
