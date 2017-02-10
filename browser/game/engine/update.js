
import { bullets, player, testText, gameMaster, teamBullet, epicbg, darknessbg, healthBarsGroup, flyingMonstersGroup, teamExplosions } from './create.js';
import { playerCollide, bulletCollide, behindLayer } from './createMap.js';
import { gmMonsters, camera } from '../controls/gameMasterControls.js';
import store from '../../store.js';
import { updateMonsters } from '../../reducers/monsters.js';
import { updateHealth } from '../../reducers/players.js';
import { teammateUpdate, LocalTeammates } from './teammateUpdate.js';
import { shallowMonsterUpdate } from './shallowMonsterUpdate.js';

import { dashboard } from '../controls/createButtons.js';

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

  //kill own bullet after certain distance
  if (bullets && Object.keys(bullets).length > 0) {
    bullets.sprite.forEachAlive(bullet => {
      let x = Math.abs(bullet.x - bullet.originalLocation.x);
      let y = Math.abs(bullet.y - bullet.originalLocation.y);
      if (bullet.shotgun && (Math.round(Math.sqrt(x*x + y*y)) >= 200)) bullet.kill();
      if (!bullet.shotgun && (Math.round(Math.sqrt(x*x + y*y)) >= 500)) bullet.kill();
    })
  }

   //kill teambullet after certain distance
  if (teamBullet && Object.keys(teamBullet).length > 0) {
    teamBullet.sprite.forEachAlive(bullet => {
      let x = Math.abs(bullet.x - bullet.originalLocation.x);
      let y = Math.abs(bullet.y - bullet.originalLocation.y);
      if (Math.sqrt(x*x + y*y) >= 500) bullet.kill();
    })
  }

  // Collision
  // teambullet collision
  this.physics.arcade.collide(teamBullet.sprite, bulletCollide, (teambullet) => {
      teambullet.kill();
  });

  // Checks which gameMode was chosen and updates appropriately
  if (store.getState().gameMode === 'survivor') {
    player.update();
    teammateUpdate.call(this, player);
    this.physics.arcade.collide(player.sprite, playerCollide);
    this.physics.arcade.collide(teamExplosions.sprite, player.sprite, (player, explosion) => {
        if (this.game.time.now > player.nextHeal) {
          player.nextHeal = this.game.time.now + 1500;
          player.health = Math.min(player.health + 5, 100);
          console.log('healing', player.health);
          store.dispatch(updateHealth({health: player.health}));
        }
    });
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
        let style = { font: '24px Arial', fill: '#ffffff', align: 'center' };
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

  //player win\
  //this should be expanded into a generic 'end of game' method
  if (store.getState().game.win) {
      let winMessageText = store.getState().game.win + '';
      let winMessageStyle = { font: '96px Arial', fill: '#ff0044', align: 'center' };
      let winMessage = this.add.text(240, 300, winMessageText, winMessageStyle)
      winMessage.fixedToCamera = true
      this.game.paused = true
      setTimeout(() => {location.href = '/'}, 7000)
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
      if (LocalTeammates[teammateID].sprite && LocalTeammates[teammateID].sprite.health > 0) {
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
    if (!gmMonsters[id].fly) this.physics.arcade.collide(gmMonsters[id].sprite, playerCollide);

    //gmMonsters collide with each other
    for (let otherIDs in gmMonsters) {
        if (id !== otherIDs) {
            this.physics.arcade.collide(gmMonsters[id].sprite, gmMonsters[otherIDs].sprite);
        }
    }

    //gmMonsters collide with bullets and deal damage
    if (gmMonsters[id]) {
      this.physics.arcade.overlap(teamBullet.sprite, gmMonsters[id].sprite, (monster, bullet) => {
        monster.health -= bullet.damage;
        bullet.kill();
      });
      this.physics.arcade.collide(teamExplosions.sprite, gmMonsters[id].sprite, (monster, explosion) => {
        if (this.game.time.now > monster.nextExplosion) {
          monster.nextExplosion = this.game.time.now + 400;
          monster.health -= explosion.damage;
          console.log('damage monster', monster.health);
        }

      });
      if (gmMonsters[id].sprite.health <= 0 ) {
        gmMonsters[id].sprite.kill();
        gmMonsters[id].sprite.healthBar.kill();
        delete gmMonsters[id];
      }
    }
  }

  store.dispatch(updateMonsters(monstersToDispatch));

  // This brings these game objects to the top of the layer stack, in the order they are run (for example, dashboard will be on top of everything)

  // bring behind layers (layers sprites can go behind) to top of layers
  this.game.world.bringToTop(behindLayer);

  //bring flying monsters on top of the layers
  this.game.world.bringToTop(flyingMonstersGroup);

  // bring healthBarsGroup to top of layers
  this.game.world.bringToTop(healthBarsGroup);

  //bring dock to top of layers
  if (dashboard) this.game.world.bringToTop(dashboard);

}
