import { move, fireBullet, rangeSplash } from '../controls/controls.js';
import HealthBar from './HealthBar.js';
import survivorsDictionary from '../dictionaries/survivorsDictionary.js';
import store from '../../store.js';
import { updateHealth, updatePlayerType } from '../../reducers/players.js';


export default class Player {
  constructor(id, game, playerType){
  this.id = id;
  this.game = game;
  this.playerType = survivorsDictionary[playerType]
  this.update = this.update.bind(this);
  this.nextFire = 0;
  this.nextMonster = 0;
  this.create();
  this.totalHealth = 100;
  }

  create() {

  //set up sprite sprite on the map
  let spawnArray = [
    [ 1000, 1000],
    [ 2000, 1000],
    [ 2800, 1800],
    [ 1900, 1870],
    [ 2195, 1040],
    [ 1564, 1564]
  ];
  let randomNumber = Math.round(Math.random() * spawnArray.length-1);
  this.sprite = this.game.add.sprite(spawnArray[randomNumber][0], spawnArray[randomNumber][1], this.playerType.name);
  this.sprite.anchor.set(0.5);
  this.sprite.scale.setTo(1);
  this.sprite.animations.add('left', this.playerType.animations.left, 7, true);
  this.sprite.animations.add('right', this.playerType.animations.right, 7, true);
  this.sprite.animations.add('down', this.playerType.animations.down, 7, true);
  this.sprite.animations.add('up', this.playerType.animations.up, 7, true);
  this.sprite.attackType = this.playerType.attackType;
  this.game.camera.follow(this.sprite);

  //collision
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.setSize(6, 20, 13, 12)

  //health bar (maybe factor this out so we can give it its own render layer?)
  this.sprite.health = 100;
  store.dispatch(updatePlayerType({playerType: this.playerType.name}));
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

  // attacks
  if (this.playerType.attackAnimations) {
    this.sprite.attackAnimations = this.playerType.attackAnimations
  }
}

  update(){
  this.sprite.body.velocity.x = 0;
  this.sprite.body.velocity.y = 0;
  this.sprite.healthBar.setPosition(this.sprite.x - 7, this.sprite.y - 40);
  this.sprite.healthBar.setPercent(this.sprite.health);
  move.call(this);
  if (this.sprite.health > 0) {
    if (this.sprite.attackType === 'fireBullet') fireBullet.call(this);
    else if (this.sprite.attackType === 'rangeSplash') rangeSplash.call(this);
    }
  }
}
