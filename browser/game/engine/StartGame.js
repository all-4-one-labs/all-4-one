import create from './create.js';
import preload from './preload.js';
import update from './update.js';

const game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
game.config.disableVisibilityChange = true;
const stage = new Phaser.Stage(game);

export default game;
