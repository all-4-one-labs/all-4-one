import { bullets, player, testText } from './create.js';
import { playerCollide } from './createMap.js';
import { monsters, monstersLocation } from '../controls/controls.js';
import Teammate from '../entities/teammate.js';
import store from '../../store.js';
import { updateHealth } from '../../reducers/players.js';
import gameMaster from '../controls/gameMaster.js';

let LocalTeammates = {};

export default function update() {
  //test text
  let time = store.getState().game
  testText.setText(time)
  if (time[0] === '0' && time[1] === '0') testText.setStyle({ font: "24px Arial", fill: "#ff0044", align: "center" })

  console.log(LocalTeammates)
  //  Collision
  this.physics.arcade.collide(player.sprite, playerCollide)

  player.update();

  //#gamemaster - maybe? not sure how this logic is going to work
  for (let i = 0; i < monsters.length; i++) {
      monsters[i].update(player.sprite.x, player.sprite.y);
      this.physics.arcade.collide(player.sprite, monsters[i].monster, (player, monster) => {
          if (this.game.time.now > monster.nextAttack) {
              player.body.immovable = true;
              // monster.body.immovable = true;
              monster.nextAttack = this.game.time.now + monster.attackRate;
              player.health -= 20;
              store.dispatch(updateHealth({health: player.health}));
          }
          if (player.health <= 0) {
              player.kill();
              player.healthBar.kill();
          }
      });

      for (let j = 0; j < monsters.length; j++) {
          if (i !== j && monsters[j]) {
              this.physics.arcade.collide(monsters[i].monster, monsters[j].monster);
          }
      }
      this.physics.arcade.collide(monsters[i].monster, playerCollide);

      this.physics.arcade.collide(bullets.sprite, monsters[i].monster, (monster, bullet) => {
          bullet.kill();
          monster.health -= 20;
          if (monster.health <= 0 ) {
              monster.kill();
              monster.healthBar.kill();
              monsters.splice(i, 1);
          }
      });
  }

  // socket.emit('monsterMove', {monsters: monstersLocation});

  let teammatesFromServer = store.getState().players.players;
  //delete teammate if they disconnect
  for (let id in LocalTeammates) {
      if (!teammatesFromServer[id]) {
          LocalTeammates[id].kill();
          delete LocalTeammates[id];
      }
  }

  for (let id in teammatesFromServer) {
    if (id !== player.id) {
      //perhaps we don't need the second half of the conditional below....add initial state?????????????
      if (LocalTeammates[id] && teammatesFromServer[id].position){
        this.physics.arcade.collide(player.sprite, LocalTeammates[id].sprite);

        //healthbar
        LocalTeammates[id].sprite.healthBar.setPosition(LocalTeammates[id].sprite.x - 7, LocalTeammates[id].sprite.y - 40);
        LocalTeammates[id].sprite.healthBar.setPercent(teammatesFromServer[id].health);
        if (teammatesFromServer[id].health <= 0) {
          LocalTeammates[id].kill();
        }

        //bullets
          if (teammatesFromServer[id].fire[0] || teammatesFromServer[id].fire[1]) {
            LocalTeammates[id].fire(teammatesFromServer[id].fire[0], teammatesFromServer[id].fire[1], teammatesFromServer[id].rate);
          }
        //if the player already exists, just move them
        if (teammatesFromServer[id].animation !== 'stop') {
          LocalTeammates[id].sprite.x = teammatesFromServer[id].position.x;
          LocalTeammates[id].sprite.y = teammatesFromServer[id].position.y;
          LocalTeammates[id].sprite.animations.play(teammatesFromServer[id].animation);

        } else {
          LocalTeammates[id].sprite.animations.stop();
          LocalTeammates[id].sprite.frame = 7;
        }
      //else create them at the place they need to be
      } else if (teammatesFromServer[id].position) {
        LocalTeammates[id] = new Teammate(id, this, teammatesFromServer[id].position.x, teammatesFromServer[id].position.y);
      }
    }
  }
}
