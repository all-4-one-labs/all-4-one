export default class Monster {
  constructor(id, game, spawnLocation){
    this.health = 100;
    this.id = id;
    this.game = game;
    this.spawnLocation = spawnLocation;
    this.create()
    this.update = this.update.bind(this)
    this.amUpdated = false;
    this.await = false;
  }

  create() {
    //set up monster sprite on the map
    this.monster = this.game.add.sprite(0, 0, 'monster');
    this.monster.alpha = 0;
    this.monster.enableBody = true;
    this.monster.anchor.set(0.5);
    this.monster.scale.setTo(1);
    this.monster.animations.add('idle', [0]);
    this.game.physics.arcade.enable(this.monster);
    this.monster.body.collideWorldBounds = true;
    this.monster.boundsPadding = 0;

  }

  update(){
    if(!this.amUpdated) {
      if(!this.await) {
        this.await = true;
        setTimeout(() => {
          this.monster.alpha = 1;
          this.monster.x = this.spawnLocation.x;
          this.monster.y = this.spawnLocation.y;
          console.log('I updated!');
          this.amUpdated = true;
        }, 50)
      }
    }
  }


}
