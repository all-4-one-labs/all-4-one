import HealthBar from './HealthBar.js';

export default class Teammate {
  constructor(id, game, xcord, ycord){
    this.id = id
    this.game = game
    this.create(xcord, ycord);
  }

  create(xcord, ycord) {
    this.sprite = this.game.add.sprite(xcord, ycord, 'dude');
    this.sprite.anchor.set(0.5);
    this.sprite.animations.add('left', [22, 23, 24, 25, 26, 27, 28], 10, true);
    this.sprite.animations.add('right', [33, 34, 35, 36, 37, 38, 39], 10, true);
    this.sprite.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
    this.sprite.animations.add('up', [11, 12, 13, 14, 15, 16, 17], 10, true);
    this.sprite.healthBar = new HealthBar(this.game, {width: 70, height: 10, x: this.sprite.x - 7, y: this.sprite.y - 40});
  }

  kill() {
    this.sprite.kill();
    this.sprite.healthBar.kill();
  }
}
