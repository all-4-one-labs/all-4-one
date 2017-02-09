import { bullets, blaster, explosionsound, explosions } from '../engine/create.js' //change to being from bullets file
import store from '../../store.js'
import {updatePosition, survivorFire} from '../../reducers/players.js'
// Check for movement

let fireRate = 300

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
  if (this.cursors.left.isDown) xCord = -10000
  if (this.cursors.right.isDown) xCord = 10000
  if (this.cursors.up.isDown) yCord = -10000
  if (this.cursors.down.isDown) yCord = 10000

  if ((xCord || yCord) && this.game.time.now > this.nextFire && bullets.sprite.countDead() > 0) {
    blaster.play('', 0, 0.3)
    this.nextFire = this.game.time.now + fireRate
    let bullet = bullets.sprite.getFirstDead();
    bullet.scale.setTo(1)
    bullet.body.setSize(20, 30)
    bullet.reset(this.sprite.x, this.sprite.y)
    this.game.physics.arcade.moveToXY(bullet, this.sprite.x + xCord, this.sprite.y + yCord, 600);
     bullet.originalLocation = {x: bullet.x, y: bullet.y};
    //fire needs to be refactored when recieved and drawn by a new client
  }
  store.dispatch(survivorFire({fire: [xCord, yCord], rate: fireRate}))
}

const rangeSplash = function() {
  let addX = 0
  let addY = 0
  let pressed = false

  if (this.cursors.left.isDown) {
    addX = -100
    pressed = true
  }
  if (this.cursors.right.isDown) {
    addX = 100
    pressed = true

  }
  if (this.cursors.up.isDown) {
    addY = -100
    pressed = true

  }
  if (this.cursors.down.isDown) {
    addY = 100
    pressed = true

  }

  if ((addX || addY) && this.game.time.now > this.nextFire && explosions.sprite.countDead() > 0) {
    this.nextFire = this.game.time.now + 1000;
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

  store.dispatch(survivorFire({fire: [addX, addY], rate: 1000}))

}

export { move, fireBullet, rangeSplash }











