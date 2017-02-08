import Monster from '../entities/monsters.js';
import store from '../../store.js';
import monsterDictionary from '../dictionaries/monsterDictionary.js';

let gmMonsters = {};
let monsterId = 0;
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
  if (((pointer.worldX < 320 || pointer.worldX > 3520) || (pointer.worldY < 320 || pointer.worldY > 2240)) && pointer.y < 680 ) {
    if (pointer.isDown) {
      if(crosshair) crosshair.kill();
      crosshair = this.game.add.sprite(pointer.worldX, pointer.worldY, 'crosshair');
      crosshair.scale.setTo(0.2);
      crosshair.anchor.set(0.5);
    }
  }
  else {
    if (pointer.isDown) {
      let alert = this.game.add.text(540, 360, text, style)
      alert.fixedToCamera = true;
      setTimeout(() => {
        alert.destroy()
      }, 1000)
    }
  }
}

const spawnMonster = function(clickedMonster) {
  let text = 'CAN\'T SPAWN HERE. PLACE A CROSSHAIR DOWN TO SPAWN OFF CAMERA'
  let style = { font: "24px Arial", fill: "#ffffff", align: "center" }
  let enemyPlayers = store.getState().players.players;
  let spawnLocation;
  let pointer = this.game.input.activePointer;
  let playerMultiplier;
  if (!enemyPlayers) enemyPlayers = {};
  if (enemyPlayers) playerMultiplier = Object.keys(enemyPlayers).length;


  if (((pointer.worldX < 320 || pointer.worldX > 3520) || (pointer.worldY < 320 || pointer.worldY > 2240)) && pointer.y < 680 ) spawnLocation = {x: pointer.worldX, y: pointer.worldY}

  else if (crosshair) {
    spawnLocation = {x: crosshair.x, y: crosshair.y};
  }

  else if (!crosshair && pointer.isDown) {
    let alert = this.game.add.text(540, 360, text, style)
    alert.fixedToCamera = true;
    setTimeout(() => {
      alert.destroy()
    }, 1000)
  }


  if (this.game.time.now > this.nextMonster && pointer.isDown && clickedMonster.key && pointer.y < 680 && spawnLocation) {
      let monsterSpawn = monsterDictionary[clickedMonster.key].spawnRate / playerMultiplier;
      this.nextMonster = this.game.time.now + monsterSpawn;
      let newMonster = new Monster(this.game, spawnLocation, monsterDictionary[clickedMonster.key]);
      clickedMonster.frame = monsterDictionary[clickedMonster.key].unclickableFrame;
      gmMonsters[monsterId] = newMonster;
      monsterId++;
      setTimeout(() => {
        clickedMonster.frame = monsterDictionary[clickedMonster.key].downFrame;
      }, monsterSpawn);
  }
};

export {spawnMonster, gmMonsters, crosshairCheck, camera };
