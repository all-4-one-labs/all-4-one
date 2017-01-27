export default class Monster {
  constructor(id, game, spawnLocation){
    this.health = 100;
    this.id = id;
    this.game = game;
    this.spawnLocation = spawnLocation;
    this.create()
    this.update = this.update.bind(this)
  }

  create() {
    //set up monster sprite on the map
    this.monster = this.game.add.sprite(this.spawnLocation.x, this.spawnLocation.y, 'monster');
    this.monster.anchor.set(0.5);
    this.monster.scale.setTo(2);
    this.monster.animations.add('idle', [0]);
    this.game.physics.arcade.enable(this.monster);
    this.monster.body.collideWorldBounds = true;
  }

  update(){
  }


}
