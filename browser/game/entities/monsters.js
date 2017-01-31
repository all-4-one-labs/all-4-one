import {player} from '../create.js';

export default class Monster {

  constructor(game, spawnLocation){
    this.game = game;
    this.spawnLocation = spawnLocation;
    this.create();
  }

  create() {
    //set up monster sprite on the map
    this.monster = this.game.add.sprite(this.spawnLocation.x, this.spawnLocation.y, 'monster');
    this.monster.anchor.set(0.5);
    this.monster.scale.setTo(2);
    this.monster.animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 20, true);
    this.monster.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 20, true);
    this.monster.animations.add('right', [0,1,2,3,4,5,6,7,8,9], 20, true);
    this.game.physics.arcade.enable(this.monster);
    this.monster.body.setSize(50, 50, 20, 10);
    this.monster.health = 100;

    this.monster.nextAttack = 0;
    this.monster.attackRate = 1000;
  }

  update(playerX, playerY) {
    this.game.physics.arcade.moveToXY(this.monster, playerX, playerY, 75);
    if (playerX < this.monster.x) {
      this.monster.animations.play('left');
    }
    else if (playerX > this.monster.x) {
      this.monster.animations.play('right');

    }
  }
}
