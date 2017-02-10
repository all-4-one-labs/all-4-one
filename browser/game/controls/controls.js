import { bullets, blaster, explosionsound, explosions, sgBullets } from '../engine/create.js';
import store from '../../store.js';
import {updatePosition, survivorFire} from '../../reducers/players.js';
// Check for movement

const move = function(){
  let xCord = 0
  let yCord = 0
  let direction
  if (this.wasd.left.isDown) xCord = -200
  if (this.wasd.right.isDown) xCord = 200
  if (this.wasd.up.isDown) yCord = -200
  if (this.wasd.down.isDown) yCord = 200

  //set animation
  if (yCord) direction = yCord > 0 ? 'down' : 'up'
  if (xCord) direction = xCord > 0 ? 'right' : 'left'

  //  Stand still
  if (!xCord && !yCord) {
    this.sprite.animations.stop()
    this.sprite.frame = 0
    direction = 'stop'
  }

  //adjust diagonal
  if (xCord && yCord) {
    xCord = (142 * xCord) / 200
    yCord = (142 * yCord) / 200
  }

  this.sprite.body.velocity.x = xCord
  this.sprite.body.velocity.y = yCord
  this.sprite.animations.play(direction)

  store.dispatch(updatePosition({ position: this.sprite.position, animation: direction }))
}

//fire bullets

const fireBullet = function(){
  let angle;
  //the angles in radians
  if (this.cursors.right.isDown && this.cursors.up.isDown) angle = Math.PI / 4;
  else if (this.cursors.left.isDown && this.cursors.up.isDown) angle = 3 / 4 * Math.PI;
  else if (this.cursors.left.isDown && this.cursors.down.isDown) angle = 5 / 4 * Math.PI;
  else if (this.cursors.down.isDown && this.cursors.right.isDown) angle = 7 / 4 * Math.PI;
  else if (this.cursors.right.isDown) angle = 0;
  else if (this.cursors.up.isDown) angle = Math.PI / 2;
  else if (this.cursors.left.isDown) angle = Math.PI;
  else if (this.cursors.down.isDown) angle = 3 / 2 * Math.PI;

  if ((angle >= 0) && this.game.time.now > this.nextFire) {
    blaster.play('', 0, 0.3);
    this.nextFire = this.game.time.now + this.playerType.fireRate;

    if (this.playerType.shotgun) {
      for (let i = -2; i < 3; i++) {
        let sgbullet = sgBullets.sprite.getFirstDead();
        sgbullet.scale.setTo(1);
        sgbullet.body.setSize(20, 30);
        sgbullet.reset(this.sprite.x, this.sprite.y);
        let xCord = this.sprite.x + (10000 * Math.cos(angle + (Math.PI / 25 * i)));
        let yCord = this.sprite.y + (-10000 * Math.sin(angle + (Math.PI / 25 * i)));
        this.game.physics.arcade.moveToXY(sgbullet, xCord, yCord, 600);
        sgbullet.originalLocation = {x: sgbullet.x, y: sgbullet.y};
      }
    } else {
      let bullet = bullets.sprite.getFirstDead();
      bullet.scale.setTo(1);
      bullet.body.setSize(20, 30);
      bullet.reset(this.sprite.x, this.sprite.y);
      let xCord = this.sprite.x + (10000 * Math.cos(angle));
      let yCord = this.sprite.y + (-10000 * Math.sin(angle));
      this.game.physics.arcade.moveToXY(bullet, xCord, yCord, 600);
      bullet.originalLocation = {x: bullet.x, y: bullet.y};
    }
    //fire needs to be refactored when recieved and drawn by a new client
  }
  store.dispatch(survivorFire({fire: [angle], rate: this.playerType.fireRate}));
}

const rangeSplash = function() {
  let addX = 0;
  let addY = 0;

  if (this.cursors.left.isDown) addX = -30;
  if (this.cursors.right.isDown) addX = 30;
  if (this.cursors.up.isDown) addY = -30;
  if (this.cursors.down.isDown) addY = 30;

  if ((addX || addY) && this.game.time.now > this.nextFire) {
    this.nextFire = this.game.time.now + this.playerType.fireRate;
    let explosion = explosions.sprite.getFirstDead()
    explosion.scale.setTo(1)
    explosion.reset(this.sprite.x + addX, this.sprite.y + addY)
    explosion.body.setSize()
    explosion.animations.add('explosion', this.sprite.attackAnimations.animate, 20, false)
    explosion.animations.add('explosionBack', this.sprite.attackAnimations.animateBack, 60, false)
    explosion.animations.play('explosion')
    setTimeout( () => {
      explosionsound.play('', 0, 1.0);
    }, 1300);
    setTimeout( () => {
      explosion.animations.play('explosionBack');
    }, 1500);
    setTimeout( () => {
      explosion.kill();
    }, 2000);
  }

  store.dispatch(survivorFire({fire: [addX, addY], rate: this.playerType.fireRate}));
}

export { move, fireBullet, rangeSplash }

