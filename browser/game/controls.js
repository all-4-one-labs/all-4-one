import {bullets, fireRate, monsterRate} from './create.js' //change to being from bullets file
import Monster from './entities/monsters.js';
import socket from '../socket'
// Check for movement

var monsters = [];
var count = 0;

const move = function(x, y, direction){
  if (direction === 'stop' ) {
    this.player.animations.stop();
    this.player.frame = 0;
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
    move.call(this, -150, -150, 'left');
  } else if (this.wasd.up.isDown && this.wasd.right.isDown) {
    move.call(this, 150, -150, 'right');
  } else if (this.wasd.down.isDown && this.wasd.left.isDown) {
    move.call(this, -150, 150, 'left');
  } else if (this.wasd.down.isDown && this.wasd.right.isDown) {
    move.call(this, 150, 150, 'right');
  } else if (this.wasd.left.isDown) {
    move.call(this, -150, 0, 'left');
  } else if (this.wasd.right.isDown) {
    move.call(this, 150, 0, 'right');
  } else if (this.wasd.up.isDown) {
    move.call(this, 0, -150, 'up');
  } else if (this.wasd.down.isDown) {
    move.call(this, 0, 150, 'down');
  } else {
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
    switch(direction) {
      case 'left' : this.game.physics.arcade.moveToXY(bullet, -1000, this.player.y, 500); break;
      case 'right': this.game.physics.arcade.moveToXY(bullet, 1000, this.player.y, 500); break;
      case 'up': this.game.physics.arcade.moveToXY(bullet, this.player.x, -1000, 500); break;
      case 'down': this.game.physics.arcade.moveToXY(bullet, this.player.x, 1000, 500); break;
      case 'up-left': this.game.physics.arcade.moveToXY(bullet, this.player.x - 1000, this.player.y - 1000, 500); break;
      case 'up-right': this.game.physics.arcade.moveToXY(bullet, this.player.x + 1000, this.player.y - 1000, 500); break;
      case 'down-left': this.game.physics.arcade.moveToXY(bullet, this.player.x - 1000, this.player.y + 1000, 500); break;
      case 'down-right': this.game.physics.arcade.moveToXY(bullet, this.player.x + 1000, this.player.y + 1000, 500); break;
    }
    // if (socket) {
    //   socket.emit('playerMove', {fire: {direction, count}});
    //   count++;
    // }
  }
};

const spawnMonster = function() {
  if (this.game.time.now > this.nextMonster && this.game.input.activePointer.isDown) {
    this.nextMonster = this.game.time.now + monsterRate;
    monsters.push(new Monster(this.game, {x: this.game.input.activePointer.worldX, y: this.game.input.activePointer.worldY}));
  }
};

export { moveCheck, fireBulletsCheck, fire, spawnMonster, monsters };

