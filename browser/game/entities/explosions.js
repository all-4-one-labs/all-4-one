export default class Explosions {
  constructor(game){
    this.game = game;
    this.create();
  }

  create() {
    this.sprite = this.game.add.group();
    this.sprite.enableBody = true;
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.createMultiple(100, 'explosion');
    this.sprite.setAll('anchor.x', 0.5);
    this.sprite.setAll('anchor.y', 0.5);
    this.sprite.setAll('checkWorldBounds', true);
    this.sprite.setAll('outOfBoundsKill', true);
  }

}
