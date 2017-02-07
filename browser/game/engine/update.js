import { bullets, player, testText, gameMaster, teamBullet, epicbg, darknessbg } from './create.js';
import { playerCollide, bulletCollide } from './createMap.js';
import { gmMonsters } from '../controls/gameMasterControls.js';
import store from '../../store.js';
import { updateMonsters } from '../../reducers/monsters.js';
import { teammateUpdate, LocalTeammates } from './teammateUpdate.js';
import { shallowMonsterUpdate } from './shallowMonsterUpdate.js';
import { camera } from '../controls/gameMasterControls.js';
// import { updateHealth } from '../../reducers/players.js';
let playerDied = true;

export default function update() {
  //test text
  let time = store.getState().game.time;
  testText.setText(time);
  if (time[0] === '0' && time[1] === '0') testText.setStyle({ font: "24px Arial", fill: "#ff0044", align: "center" });
  if (time === '01:56') {
    darknessbg.stop();
    epicbg.play('', 0, 0.9);
  }
  // this.game.paused = true
  //  Collision

  // Checks which gameMode was chosen and updates appropriately
  if (store.getState().gameMode === 'survivor') {
    player.update();
    teammateUpdate.call(this, player);
    this.physics.arcade.collide(player.sprite, playerCollide)
    this.physics.arcade.collide(bullets.sprite, bulletCollide, (bullet) => {
      bullet.kill();
    });

    // draw the monsters
    shallowMonsterUpdate.call(this, player);

    // what happens when the player dies
    if (player.sprite.health <= 0 ) {
      this.game.camera.follow(null);
      camera.call(this);
      if (playerDied) {
        playerDied = false;
        let text = 'YOU DIED!';
        let style = { font: "24px Arial", fill: "#ffffff", align: "center" };
        let alert = this.game.add.text(540, 360, text, style);
        alert.fixedToCamera = true;
        setTimeout(() => {
          alert.destroy()
        }, 5000);
      }
    }

  } else if (store.getState().gameMode === 'gamemaster') {
    gameMaster.update();
    teammateUpdate.call(this, 'gm');
  }

  //player win
  if (store.getState().game.timeUp) {
      let winMessageText = 'SURVIVORS WIN';
      let winMessageStyle = { font: '96px Arial', fill: '#ff0044', align: 'center' };
      let winMessage = this.add.text(240, 300, winMessageText, winMessageStyle)
      winMessage.fixedToCamera = true
      this.game.paused = true
      setTimeout(window.location = '/', 1000)
   }

  let monstersToDispatch = {};
  for (let id in gmMonsters) {
    let tempMonster = {health: gmMonsters[id].sprite.health, x: gmMonsters[id].sprite.x, y: gmMonsters[id].sprite.y, animation: gmMonsters[id].animation, name: gmMonsters[id].monster.name};
    monstersToDispatch[id] = tempMonster;
    //variables for pathfinding
    let closest;
    let distanceToClosest = 10000000000;
    //iterating through teammates
    for (let teammateID in LocalTeammates) {
    //gmMonsters collide with player
      this.physics.arcade.collide(gmMonsters[id].sprite, LocalTeammates[teammateID]);

    //choose the closest survivor and path to them
      if (LocalTeammates[teammateID].sprite) {
        let currentDistance = Phaser.Math.distance(gmMonsters[id].sprite.x, gmMonsters[id].sprite.y, LocalTeammates[teammateID].sprite.x, LocalTeammates[teammateID].sprite.y);
        if (currentDistance < distanceToClosest) {
          distanceToClosest = currentDistance;
          closest = LocalTeammates[teammateID];
        }
      }
    }

    //gmMonsters path to the player
    if (closest) gmMonsters[id].update(closest.sprite.x, closest.sprite.y, distanceToClosest);

    //gmMonsters collide with map
    this.physics.arcade.collide(gmMonsters[id].sprite, playerCollide);

    //gmMonsters collide with each other
    for (let otherIDs in gmMonsters) {
        if (id !== otherIDs) {
            this.physics.arcade.collide(gmMonsters[id].sprite, gmMonsters[otherIDs].sprite);
        }
    }

    //gmMonsters collide with bullets and deal damage
    this.physics.arcade.collide(teamBullet.sprite, gmMonsters[id].sprite, (monster, bullet) => {
      bullet.kill();
      monster.health -= 20;
      if (monster.health <= 0 ) {
        monster.kill();
        monster.healthBar.kill();
        delete gmMonsters[id];
      }
    });
  }
  store.dispatch(updateMonsters(monstersToDispatch));
}
