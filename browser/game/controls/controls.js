import { bullets, blaster, explosionsound, explosions } from '../engine/create.js';
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
  let xCord = 0
  let yCord = 0
  if (this.cursors.left.isDown) xCord = -10000;
  if (this.cursors.right.isDown) xCord = 10000;
  if (this.cursors.up.isDown) yCord = -10000;
  if (this.cursors.down.isDown) yCord = 10000;

  if ((xCord || yCord) && this.game.time.now > this.nextFire && bullets.sprite.countDead() > 0) {
    blaster.play('', 0, 0.3);
    this.nextFire = this.game.time.now + this.playerType.fireRate;

    if (this.playerType.shotgun) {
      for (let i = -2; i < 3; i++) {
        let bullet = bullets.sprite.getFirstDead();
        let angleX = xCord - (i * 700);
        let angleY = yCord - (i * 700);
        // console.log(this.sprite.x + angleX, this.sprite.y + angleY);
        bullet.scale.setTo(1);
        bullet.body.setSize(20, 30);
        bullet.shotgun = true;
        bullet.reset(this.sprite.x, this.sprite.y);
        this.game.physics.arcade.moveToXY(bullet, this.sprite.x + angleX, this.sprite.y + angleY, 600);
        bullet.originalLocation = {x: bullet.x, y: bullet.y};
      }
    } else {
      let bullet = bullets.sprite.getFirstDead();
      bullet.scale.setTo(1)
      bullet.body.setSize(20, 30)
      bullet.reset(this.sprite.x, this.sprite.y)
      this.game.physics.arcade.moveToXY(bullet, this.sprite.x + xCord, this.sprite.y + yCord, 600);
      bullet.originalLocation = {x: bullet.x, y: bullet.y};
    }
    //fire needs to be refactored when recieved and drawn by a new client
  }
  store.dispatch(survivorFire({fire: [xCord, yCord], rate: this.playerType.fireRate}));
}

const rangeSplash = function() {
  let addX = 0;
  let addY = 0;

  if (this.cursors.left.isDown) addX = -30;
  if (this.cursors.right.isDown) addX = 30;
  if (this.cursors.up.isDown) addY = -30;
  if (this.cursors.down.isDown) addY = 30;

  if ((addX || addY) && this.game.time.now > this.nextFire && explosions.sprite.countDead() > 0) {
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











