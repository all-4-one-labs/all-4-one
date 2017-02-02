import {bullets} from './create.js' //change to being from bullets file
import Monster from './entities/monsters.js';
import socket from '../socket';
// Check for movement

let monsters = [];
let fireRate = 300;
let monsterRate = 1000;
var monstersLocation = [];

const move = function(x, y, direction){
  if (direction === 'stop' ) {
    this.player.animations.stop();
    this.player.frame = 7;
  } else {
    this.player.body.velocity.x = x;
    this.player.body.velocity.y = y;
    this.player.animations.play(direction);
  }
  if (socket) {
    socket.emit('playerMove', {position: this.player.position, animation: direction});
  }
};

const moveCheck = function(){
  if (this.wasd.up.isDown && this.wasd.left.isDown) {
    move.call(this, -142, -142, 'left');
  } else if (this.wasd.up.isDown && this.wasd.right.isDown) {
    move.call(this, 142, -142, 'right');
  } else if (this.wasd.down.isDown && this.wasd.left.isDown) {
    move.call(this, -142, 142, 'left');
  } else if (this.wasd.down.isDown && this.wasd.right.isDown) {
    move.call(this, 142, 142, 'right');
  } else if (this.wasd.left.isDown) {
    move.call(this, -200, 0, 'left');
  } else if (this.wasd.right.isDown) {
    move.call(this, 200, 0, 'right');
  } else if (this.wasd.up.isDown) {
    move.call(this, 0, -200, 'up');
  } else if (this.wasd.down.isDown) {
    move.call(this, 0, 200, 'down');
  } else {
    //  Stand still
    this.player.animations.stop();
    this.player.frame = 7;
    move.call(this, 0, 0, 'stop');
  }
};

//fire bullets
const fireBulletsCheck = function(){
  if (this.cursors.up.isDown && this.cursors.left.isDown) {
    fire.call(this,'up-left');
  } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
    fire.call(this,'up-right');
  } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
    fire.call(this,'down-left');
  } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
    fire.call(this,'down-right');
  } else if (this.cursors.left.isDown) {
    fire.call(this,'left');
  } else if (this.cursors.right.isDown) {
    fire.call(this,'right');
  } else if (this.cursors.up.isDown) {
    fire.call(this,'up');
  } else if (this.cursors.down.isDown) {
    fire.call(this,'down');
  }
}

//fire helper function
const fire = function(direction) {
  if (this.game.time.now > this.nextFire && bullets.bullets.countDead() > 0) {
    this.nextFire = this.game.time.now + fireRate;
    var bullet = bullets.bullets.getFirstDead();
    bullet.scale.setTo(0.25);
    bullet.body.setSize(20, 30);
    bullet.reset(this.player.x, this.player.y);
    switch (direction) {
      case 'left' : this.game.physics.arcade.moveToXY(bullet, this.player.x - 10000, this.player.y, 600); break;
      case 'right': this.game.physics.arcade.moveToXY(bullet, this.player.x + 10000, this.player.y, 600); break;
      case 'up': this.game.physics.arcade.moveToXY(bullet, this.player.x, this.player.y - 10000, 600); break;
      case 'down': this.game.physics.arcade.moveToXY(bullet, this.player.x, this.player.y + 10000, 600); break;
      case 'up-left': this.game.physics.arcade.moveToXY(bullet, this.player.x - 10000, this.player.y - 10000, 600); break;
      case 'up-right': this.game.physics.arcade.moveToXY(bullet, this.player.x + 10000, this.player.y - 10000, 600); break;
      case 'down-left': this.game.physics.arcade.moveToXY(bullet, this.player.x - 10000, this.player.y + 10000, 600); break;
      case 'down-right': this.game.physics.arcade.moveToXY(bullet, this.player.x + 10000, this.player.y + 10000, 600); break;
      default: break;
    }
    if (socket) socket.emit('playerShoot', {fire: direction, rate: fireRate});
  }
};

//#gameMaster - we need to work on this to create a monster for players
const spawnMonster = function() {
  if (this.game.time.now > this.nextMonster && this.game.input.activePointer.isDown) {
    this.nextMonster = this.game.time.now + monsterRate;
    let newMonster = new Monster(this.game, {x: this.game.input.activePointer.worldX, y: this.game.input.activePointer.worldY});
    monsters.push(newMonster);
    monstersLocation.push({x: newMonster.monster.position.x, y: newMonster.monster.position.y, health: newMonster.monster.health });
  }
};

export { moveCheck, fireBulletsCheck, fire, spawnMonster, monsters, monstersLocation };

