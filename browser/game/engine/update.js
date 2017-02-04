import { bullets, player, testText, gameMaster } from './create.js';
import { playerCollide, bulletCollide } from './createMap.js';
import { gmMonsters } from '../controls/gameMasterControls.js';
import store from '../../store.js';
import { updateHealth } from '../../reducers/players.js';
import { updateMonsters } from '../../reducers/monsters.js';
import { teammateUpdate, LocalTeammates } from './teammateUpdate.js';
import { shallowMonstersUpdate } from './shallowMonsterUpdate.js';

export default function update() {
  //test text
  let time = store.getState().game.time
  testText.setText(time)
  if (time[0] === '0' && time[1] === '0') testText.setStyle({ font: "24px Arial", fill: "#ff0044", align: "center" })
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
    shallowMonstersUpdate.call(this);

  } else if (store.getState().gameMode === 'gamemaster') {
    gameMaster.update()
    teammateUpdate.call(this, 'gm');
  }

  if (this.input.activePointer.isDown) {
        if (this.origDragPoint) {
            // move the camera by the amount the mouse has moved since last update
            this.game.camera.x += this.origDragPoint.x - this.input.activePointer.position.x;
            this.game.camera.y += this.origDragPoint.y - this.input.activePointer.position.y;
        }
        // set new drag origin to current position
        this.origDragPoint = this.input.activePointer.position.clone();
    }
    else {
        this.origDragPoint = null;
    }



  //player win
  if (store.getState().game.timeUp) {
      let winMessageText = 'SURVIVORS WIN';
      let winMessageStyle = { font: '96px Arial', fill: '#ff0044', align: 'center' };
      let winMessage = this.add.text(240, 300, winMessageText, winMessageStyle)
      winMessage.fixedToCamera = true
      this.game.paused = true
   }
  //handle gmMonsters
  //#gamemaster - maybe? not sure how this logic is going to work
  let monstersToDispatch = []
  for (let i = 0; i < gmMonsters.length; i++) {
      let tempMonster = {health: gmMonsters[i].sprite.health, x: gmMonsters[i].sprite.x, y: gmMonsters[i].sprite.y, animation: gmMonsters[i].animation, id: gmMonsters[i].id}
      monstersToDispatch.push(tempMonster)
      //choose the closest survivor and path to them
      let closest
      let distanceToClosest = 0
      for (let id in LocalTeammates) {
        if (LocalTeammates[id].sprite) {
          let currentDistance = Phaser.Math.distance(gmMonsters[i].sprite.x, gmMonsters[i].sprite.y, LocalTeammates[id].sprite.x, LocalTeammates[id].sprite.y)
          if (currentDistance > distanceToClosest) {
            distanceToClosest = currentDistance
            closest = LocalTeammates[id]
          }
        }
      }

      //gmMonsters path to the player
      //GM
      if (closest) gmMonsters[i].update(closest.sprite.x, closest.sprite.y)
      //old: gmMonsters[i].update(player.sprite.x, player.sprite.y);

    if (player) {
      //gmMonsters attack the player
      //TBD
      this.physics.arcade.collide(player.sprite, gmMonsters[i].sprite, (player, monster) => {
          if (this.game.time.now > monster.nextAttack) {
              player.body.immovable = true;
              monster.nextAttack = this.game.time.now + monster.attackRate;
              player.health -= 20;
              store.dispatch(updateHealth({health: player.health}));
          }
          if (player.health <= 0) {
              player.kill();
              player.healthBar.kill();
          }
      });

      //gmMonsters collide with each other
      //GM
      for (let j = 0; j < gmMonsters.length; j++) {
          if (i !== j && gmMonsters[j]) {
              this.physics.arcade.collide(gmMonsters[i].sprite, gmMonsters[j].sprite);
          }
      }

      //gmMonsters collide with the player
      //TBD
      this.physics.arcade.collide(gmMonsters[i].sprite, playerCollide);

      //gmMonsters collide with bullets
      //player
      this.physics.arcade.collide(bullets.sprite, gmMonsters[i].sprite, (monster, bullet) => {
          bullet.kill();
          monster.health -= 20;
          if (monster.health <= 0 ) {
              monster.kill();
              monster.healthBar.kill();
              gmMonsters.splice(i, 1);
          }
      });


    }
  }
  store.dispatch(updateMonsters(monstersToDispatch))
}