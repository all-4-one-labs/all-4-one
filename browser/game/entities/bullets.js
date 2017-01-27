export default class Bullets {
  constructor(game){
    this.game = game;
    this.create();
  }

  create() {
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.game.physics.arcade.enable(this.bullets);
    this.bullets.createMultiple(50, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
  }


}
