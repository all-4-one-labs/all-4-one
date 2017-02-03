import Monster from '../entities/monsters.js';
import store from '../../store.js';


let monsterRate = 1000;
let monsters = [];
let monstersLocation = [];
const monsterDictionary = {
  mummyC: {
    name: 'mummyC',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      left: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      right: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    body: [12, 12, 2, 4],
    health: 100,
    attackRate: 1000,
    attack: 20
  },
  lurkerC: {
    name: 'lurkerC',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3, 4],
      left: [0, 1, 2, 3, 4],
      right: [0, 1, 2, 3, 4]
    },
    body: [12, 12, 2, 4],
    health: 100,
    attackRate: 1000,
    attack: 20
  },
  slimeB: {
    name: 'slimeB',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      left: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      right: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    },
    body: [12, 12, 2, 4],
    health: 100,
    attackRate: 1000,
    attack: 20
  }
};

const spawnMonster = function(clickedMonster) {
  let pointer = this.game.input.activePointer
  let text = 'CAN\'T SPAWN HERE'
  let style = { font: "24px Arial", fill: "#ffffff", align: "center" }
  let enemyPlayers = store.getState().players.players;
  if (!enemyPlayers) enemyPlayers = {}
  let playerMultiplier = Object.keys(enemyPlayers).length;

  if ((pointer.worldX < 320 || pointer.worldX > 3520) || (pointer.worldY < 320 || pointer.worldY > 2240)) {
    if (this.game.time.now > this.nextMonster && this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && clickedMonster) {
      this.nextMonster = this.game.time.now + monsterRate/playerMultiplier;
      let newMonster = new Monster(this.game, {x: pointer.worldX, y: pointer.worldY}, monsterDictionary[clickedMonster]);
      monsters.push(newMonster);
      monstersLocation.push({x: newMonster.sprite.position.x, y: newMonster.sprite.position.y, health: newMonster.sprite.health });
    }
  } else {
    if (this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) {
      let alert = this.game.add.text(540, 360, text, style)
      alert.fixedToCamera = true;
      setTimeout(() => {
        alert.destroy()
      }, 1000)
    }
  }

};

export {spawnMonster, monsters, monstersLocation}
