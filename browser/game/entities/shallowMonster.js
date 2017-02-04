import HealthBar from './HealthBar.js';

export default class shallowMonster {
  constructor(id, game, xCord, yCord){
    this.id = id;
    this.game = game;
    this.create(xCord, yCord);
  }

  create(xCord, yCord) {
    this.sprite = this.game.add.sprite(xCord, yCord, 'monsterA');
    this.sprite.anchor.set(0.5);
    this.sprite.scale.setTo(2);
    this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
    this.sprite.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
    this.sprite.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.health = 100;
    this.sprite.body.immovable = true;
    this.sprite.healthBar = new HealthBar(this.game, {width: 70, height: 10, x: this.sprite.x - 7, y: this.sprite.y - 40, bar: {color: '#ed2a2a'}, bg: {color: 'black'}});
  }

  kill() {
    this.sprite.kill();
    this.sprite.healthBar.kill();
  }
}
