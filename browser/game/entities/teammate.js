// import {healthBarsGroup} from '../engine/create.js'
import HealthBar from './HealthBar.js';
import { teamBullet, blaster } from '../engine/create.js' //change to being from bullets file

export default class Teammate {
  constructor(id, game, xCord, yCord){
    this.id = id;
    this.game = game;
    this.create(xCord, yCord);
    this.nextFire = 0;
    this.totalHealth = 100;
  }

  create(xCord, yCord) {
    this.sprite = this.game.add.sprite(xCord, yCord, 'dude');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.set(0.5);
    this.sprite.animations.add('left', [19,18,19,20], 10, true);
    this.sprite.animations.add('right', [31,30,31,32], 10, true);
    this.sprite.animations.add('down', [7,6,7,8], 10, true);
    this.sprite.animations.add('up', [43,42,43,44], 10, true);
    this.sprite.body.immovable = true;
    // this.sprite.body.setSize(60, 80, 45, 35);
    this.sprite.health = 100;
    this.sprite.healthBar = new HealthBar(this.game, {width: 70, height: 10, x: this.sprite.x - 7, y: this.sprite.y - 40, bar: {color: 'blue'}, bg: {color: 'black'}});
    // healthBarsGroup.add(this.sprite.healthBar)
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  kill() {
    this.sprite.kill();
    this.sprite.healthBar.kill();
  }
  fire (xCord, yCord, fireRate) {

    if ((xCord || yCord) && this.game.time.now > this.nextFire && teamBullet.sprite.countDead() > 0) {
        blaster.play();
        this.nextFire = this.game.time.now + fireRate
        let bullet = teamBullet.sprite.getFirstDead()
        bullet.scale.setTo(1)
        bullet.body.setSize(20, 30)
        bullet.reset(this.sprite.x, this.sprite.y)
        this.game.physics.arcade.moveToXY(bullet, this.sprite.x + xCord, this.sprite.y + yCord, 600)
      }
  }

}
