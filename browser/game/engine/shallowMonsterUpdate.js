import store from '../../store.js';
import shallowMonster from '../entities/shallowMonster.js';

let LocalMonsters = [];

function shallowMonsterUpdate() {
  let monstersFromServer = store.getState().shallowMonsters;
  //delete teammate if they disconnect
  // for (let id in LocalMonsters) {
  //     if (!monstersFromServer[id]) {
  //         LocalTeammates[id].kill();
  //         delete LocalTeammates[id];
  //     }
  // }
  for (let i = 0; i < monstersFromServer.length; i++) {
    
    if (monstersFrom)


  }








  for (let id in monstersFromServer) {
      if (LocalMonsters[id] && monstersFromServer[id].position){

        this.physics.arcade.collide(player.player, LocalMonsters[id].sprite);

        //healthbar
        LocalMonsters[id].sprite.healthBar.setPosition(LocalMonsters[id].sprite.x - 7, LocalMonsters[id].sprite.y - 40);
        LocalMonsters[id].sprite.healthBar.setPercent(monstersFromServer[id].health);
        if (monstersFromServer[id].health <= 0) {
          LocalMonsters[id].kill();
        }

        //if the player already exists, just move them
        if (monstersFromServer[id].animation !== 'stop') {
          LocalMonsters[id].sprite.x = monstersFromServer[id].position.x;
          LocalMonsters[id].sprite.y = monstersFromServer[id].position.y;
          LocalMonsters[id].sprite.animations.play(monstersFromServer[id].animation);

        } else {
          LocalMonsters[id].sprite.animations.stop();
          LocalMonsters[id].sprite.frame = 7;
        }
      //else create them at the place they need to be
      } else if (monstersFromServer.position) {
      LocalMonsters[id] = new shallowMonster(id, this, monstersFromServer[id].position.x, monstersFromServer[id].position.y);
      }
  }
}

export {teammateUpdate, LocalMonsters}