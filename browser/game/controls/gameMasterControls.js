import Monster from '../entities/monsters.js';
import store from '../../store.js';
import monsterDictionary from './monsterDictionary.js';

let monsters = [];
let crosshair;

const camera = function() {
      if (this.input.keyboard.addKey(Phaser.Keyboard.W).isDown) {
          this.game.camera.y -= 15;
      }
      else if (this.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
          this.game.camera.x -= 15;
      }
      else if (this.input.keyboard.addKey(Phaser.Keyboard.S).isDown) {
          this.game.camera.y += 15;
      }
      else if (this.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
          this.game.camera.x += 15;
      }
}

const crosshairCheck = function() {
  let text = 'CAN\'T PLACE HERE'
  let style = { font: "24px Arial", fill: "#ffffff", align: "center" }
  let pointer = this.game.input.activePointer;
  if ((pointer.worldX < 320 || pointer.worldX > 3520) || (pointer.worldY < 320 || pointer.worldY > 2240)) {
    if (this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) {
      if(crosshair) crosshair.kill();
      crosshair = this.game.add.sprite(pointer.worldX, pointer.worldY, 'crosshair');
      crosshair.scale.setTo(0.2);
      crosshair.anchor.set(0.5);
    }
  }
  else {
    if (this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) {
      let alert = this.game.add.text(540, 360, text, style)
      alert.fixedToCamera = true;
      setTimeout(() => {
        alert.destroy()
      }, 1000)
    }
  }
}

const spawnMonster = function(clickedMonster) {
  let enemyPlayers = store.getState().players.players;
  let spawnLocation;
  let pointer = this.game.input.activePointer;
  if (!enemyPlayers) enemyPlayers = {};
  let playerMultiplier = Object.keys(enemyPlayers).length;

  if ((pointer.worldX < 320 || pointer.worldX > 3520) || (pointer.worldY < 320 || pointer.worldY > 2240)) spawnLocation = {x: pointer.worldX, y: pointer.worldY}
  else {
    if (crosshair) {
      spawnLocation = {x: crosshair.x, y: crosshair.y};
    }
    else {
      spawnLocation = {x: 0, y: 0};
    }
  }

  if (this.game.time.now > this.nextMonster && this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && clickedMonster.key) {
      this.nextMonster = this.game.time.now + monsterDictionary[clickedMonster.key].spawnRate / playerMultiplier;
      let newMonster = new Monster(this.game, spawnLocation, monsterDictionary[clickedMonster.key]);
      clickedMonster.frame = monsterDictionary[clickedMonster.key].unclickableFrame;
      monsters.push(newMonster);
      setTimeout(() => {
        clickedMonster.frame = monsterDictionary[clickedMonster.key].clickableFrame;
      }, monsterDictionary[clickedMonster.key].spawnRate);
  }
};

export {spawnMonster, monsters, crosshairCheck, camera };
