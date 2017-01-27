// import {bullets, fireRate} from '../create.js' //change to being from bullets file
import { moveCheck, fireBulletsCheck, fire } from '../controls.js' 

export default class Player {
  constructor(id, game){
    this.health = 100;
    this.id = id;
    this.game = game;
    this.update = this.update.bind(this);
    // this.fire = this.fire.bind(this);
    this.nextFire = 0;
    this.create();
  }

  create() {
    //set up player sprite on the map
    this.player = this.game.add.sprite(0, 0, 'dude');
    this.player.anchor.set(0.5);
    this.player.scale.setTo(1);
    this.player.animations.add('left', [22, 23, 24, 25, 26, 27, 28], 10, true);
    this.player.animations.add('right', [33, 34, 35, 36, 37, 38, 39], 10, true);
    this.player.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
    this.player.animations.add('up', [11, 12, 13, 14, 15, 16, 17], 10, true);
    this.game.camera.follow(this.player);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.boundsPadding = 0;

    //controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
  }

  update(){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    moveCheck.call(this);
    fireBulletsCheck.call(this);
    }
    
}
