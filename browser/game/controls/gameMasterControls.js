import Monster from '../entities/monsters.js';

let monsterRate = 1000;
let monsters = [];
let monstersLocation = [];

const spawnMonster = function() {
  if (this.game.time.now > this.nextMonster && this.game.input.activePointer.isDown) {
    this.nextMonster = this.game.time.now + monsterRate;
    let newMonster = new Monster(this.game, {x: this.game.input.activePointer.worldX, y: this.game.input.activePointer.worldY});
    monsters.push(newMonster);
    monstersLocation.push({x: newMonster.monster.position.x, y: newMonster.monster.position.y, health: newMonster.monster.health });
  }
};

export {spawnMonster, monsters, monstersLocation}
