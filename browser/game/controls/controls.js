import { bullets } from '../engine/create.js' //change to being from bullets file
import store from '../../store.js';
import {updatePosition, survivorFire} from '../../reducers/players.js';
// Check for movement

let fireRate = 300;

const moveCheck = function(){
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
    this.player.animations.stop()
    this.player.frame = 7
    direction = 'stop'
  }

  //adjust diagonal
  if (xCord && yCord) {
    xCord = (142 * xCord) / 200
    yCord = (142 * yCord) / 200
  }

  this.player.body.velocity.x = xCord
  this.player.body.velocity.y = yCord
  this.player.animations.play(direction)

  store.dispatch(updatePosition({ position: this.player.position, animation: direction }))
}


//fire bullets

const fireBulletsCheck = function(){
  let xCord = 0
  let yCord = 0
  if (this.cursors.left.isDown) xCord = -10000
  if (this.cursors.right.isDown) xCord = 10000
  if (this.cursors.up.isDown) yCord = -10000
  if (this.cursors.down.isDown) yCord = 10000

  if ((xCord || yCord) && this.game.time.now > this.nextFire && bullets.bullets.countDead() > 0) {
    this.nextFire = this.game.time.now + fireRate
    let bullet = bullets.bullets.getFirstDead()
    bullet.scale.setTo(1)
    bullet.body.setSize(20, 30)
    bullet.reset(this.player.x, this.player.y)
    this.game.physics.arcade.moveToXY(bullet, this.player.x + xCord, this.player.y + yCord, 600)
    //fire needs to be refactored when recieved and drawn by a new client
  }
  store.dispatch(survivorFire({fire: [xCord, yCord], rate: fireRate}))
}


export { moveCheck, fireBulletsCheck };

