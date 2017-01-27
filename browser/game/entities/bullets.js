//to be completed

export default class Bullet {
  constructor(game){
    this.game = game;
    this.create()
    this.update = this.update.bind(this)
  }

  create() {
    //set up monster sprite on the map
    bullets = this.game.add.group();
    bullets.enableBody = true;
    this.game.physics.arcade.enable(bullets);
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
  }

  update(){
  }


}
