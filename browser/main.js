import create from './create.js';
import preload from './preload.js';
import update from './update.js';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });
game.config.disableVisibilityChange = true;
var stage = new Phaser.Stage(game);

export default game;
