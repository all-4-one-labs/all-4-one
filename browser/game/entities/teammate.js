import HealthBar from './HealthBar.js';
import { teamBullet, fireRate, monsterRate } from '../create.js' //change to being from bullets file

export default class Teammate {
  constructor(id, game, xcord, ycord){
    this.id = id;
    this.game = game;
    this.create(xcord, ycord);
    this.nextFire = 0;
  }

  create(xcord, ycord) {
    this.sprite = this.game.add.sprite(xcord, ycord, 'dude');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.set(0.5);
    this.sprite.animations.add('left', [19,18,19,20], 10, true);
    this.sprite.animations.add('right', [31,30,31,32], 10, true);
    this.sprite.animations.add('down', [7,6,7,8], 10, true);
    this.sprite.animations.add('up', [43,42,43,44], 10, true);

    this.sprite.body.immovable = true;
    // this.sprite.body.setSize(60, 80, 45, 35);
    this.sprite.health = 100;

    this.sprite.healthBar = new HealthBar(this.game, {width: 70, height: 10, x: this.sprite.x - 7, y: this.sprite.y - 40});
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  kill() {
    this.sprite.kill();
    this.sprite.healthBar.kill();
  }

  fire(direction) {
    if (this.game.time.now > this.nextFire && teamBullet.bullets.countDead() > 0) {
      this.nextFire = this.game.time.now + fireRate;
      var bullet = teamBullet.bullets.getFirstDead();
      bullet.scale.setTo(0.25);
      bullet.body.setSize(20, 30);
      bullet.reset(this.sprite.x, this.sprite.y);
      switch(direction) {
        case 'left' : this.game.physics.arcade.moveToXY(bullet, -1000, this.sprite.y, 500); break;
        case 'right': this.game.physics.arcade.moveToXY(bullet, 1000, this.sprite.y, 500); break;
        case 'up': this.game.physics.arcade.moveToXY(bullet, this.sprite.x, -1000, 500); break;
        case 'down': this.game.physics.arcade.moveToXY(bullet, this.sprite.x, 1000, 500); break;
        case 'up-left': this.game.physics.arcade.moveToXY(bullet, this.sprite.x - 1000, this.sprite.y - 1000, 500); break;
        case 'up-right': this.game.physics.arcade.moveToXY(bullet, this.sprite.x + 1000, this.sprite.y - 1000, 500); break;
        case 'down-left': this.game.physics.arcade.moveToXY(bullet, this.sprite.x - 1000, this.sprite.y + 1000, 500); break;
        case 'down-right': this.game.physics.arcade.moveToXY(bullet, this.sprite.x + 1000, this.sprite.y + 1000, 500); break;
      }
    }
  }
}
