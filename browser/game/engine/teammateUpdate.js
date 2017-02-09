// import { player } from './create.js'
import store from '../../store.js'
import Teammate from '../entities/teammate.js'

let LocalTeammates = {}

function teammateUpdate(player) {
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
      if (LocalTeammates[id] && teammatesFromServer[id].position){

        this.physics.arcade.collide(player.sprite, LocalTeammates[id].sprite);

        //healthbar
        LocalTeammates[id].sprite.healthBar.setPosition(LocalTeammates[id].sprite.x - 7, LocalTeammates[id].sprite.y - 40);
        LocalTeammates[id].sprite.healthBar.setPercent(teammatesFromServer[id].health, LocalTeammates[id].totalHealth);
        LocalTeammates[id].sprite.health = teammatesFromServer[id].health
        if (teammatesFromServer[id].health <= 0) {
          LocalTeammates[id].kill();
        }

        // bullets
          if (teammatesFromServer[id].fire[0] || teammatesFromServer[id].fire[1]) {
            if (teammatesFromServer[id].playerType === 'survivorB') {
              LocalTeammates[id].rangeSplash(teammatesFromServer[id].fire[0], teammatesFromServer[id].fire[1], teammatesFromServer[id].rate)
            }
            else LocalTeammates[id].fire(teammatesFromServer[id].fire[0], teammatesFromServer[id].fire[1], teammatesFromServer[id].rate);
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
        LocalTeammates[id] = new Teammate(id, this, teammatesFromServer[id].position.x, teammatesFromServer[id].position.y, teammatesFromServer[id].playerType);
      }
    }
  }
}

export {teammateUpdate, LocalTeammates}