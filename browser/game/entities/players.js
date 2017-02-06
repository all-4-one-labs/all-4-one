
import { move, fireBullet } from '../controls/controls.js';
import HealthBar from './HealthBar.js';
import {spawnMonster} from '../controls/gameMasterControls.js';

import store from '../../store.js';
import { updateHealth } from '../../reducers/players.js';


export default class Player {
  constructor(id, game){
    this.id = id;
    this.game = game;
    this.update = this.update.bind(this);
    this.nextFire = 0;
    this.nextMonster = 0;
    this.create();
  }

  create() {

    //set up sprite sprite on the map
    this.sprite = this.game.add.sprite(0, 0, 'dude');
    this.sprite.anchor.set(0.5);
    this.sprite.scale.setTo(1);
    this.sprite.animations.add('left', [19,18,19,20], 10, true);
    this.sprite.animations.add('right', [31,30,31,32], 10, true);
    this.sprite.animations.add('down', [7,6,7,8], 10, true);
    this.sprite.animations.add('up', [43,42,43,44], 10, true);
    this.game.camera.follow(this.sprite);

    //collision
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(6, 20, 13, 12)

    //health bar (maybe factor this out so we can give it its own render layer?)
    this.sprite.health = 100;
    store.dispatch(updateHealth({health: this.sprite.health}));
    this.sprite.healthBar = new HealthBar(this.game, {width: 70, height: 10, x: this.sprite.x - 7, y: this.sprite.y - 40, bg: {color: 'black'}});

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
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.healthBar.setPosition(this.sprite.x - 7, this.sprite.y - 40);
    this.sprite.healthBar.setPercent(this.sprite.health);
    move.call(this);
    if (this.sprite.health > 0) fireBullet.call(this);
  }
}
