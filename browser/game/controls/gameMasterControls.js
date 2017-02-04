import Monster from '../entities/monsters.js';

let monsterRate = 1000;
let gmMonsters = {};
let monsterId = 0;

const spawnMonster = function() {
  if (this.game.time.now > this.nextMonster && this.game.input.activePointer.isDown) {
    this.nextMonster = this.game.time.now + monsterRate;
    let newMonster = new Monster(this.game, {x: this.game.input.activePointer.worldX, y: this.game.input.activePointer.worldY});
    gmMonsters[monsterId] = newMonster;
    monsterId++;
  }
};

export {spawnMonster, gmMonsters};
