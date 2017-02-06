import store from '../../store.js';
import shallowMonster from '../entities/shallowMonster.js';
import { updateHealth } from '../../reducers/players.js';
import { bullets } from './create.js';

let LocalMonsters = {};

function shallowMonsterUpdate(player) {
  let monstersFromServer = store.getState().shallowMonsters;
  //delete monster if they die
  for (let id in LocalMonsters) {
      if (!monstersFromServer[id]) {
          LocalMonsters[id].kill();
          delete LocalMonsters[id];
      }
  }

  for (let id in monstersFromServer) {
    //the first half of this conditional decides whether we create the shallow object or just update it
    if (LocalMonsters[id] && monstersFromServer[id].x){
      //player collision with monsters - survivor side
      this.physics.arcade.collide(player.sprite, LocalMonsters[id].sprite, (player, monster) => {
        if (this.game.time.now > monster.nextAttack) {
          player.body.immovable = true;
          monster.nextAttack = this.game.time.now + monster.attackRate;
          player.health -= monster.attack;
          store.dispatch(updateHealth({health: player.health}));
        }
        if (player.health <= 0) {
          player.kill();
          player.healthBar.kill();
        }
      });

      //bullet collision with monsters - survivor side
      this.physics.arcade.collide(bullets.sprite, LocalMonsters[id].sprite, (monster, bullet) => {
        bullet.kill();
      });

      //healthbar
      LocalMonsters[id].sprite.healthBar.setPosition(LocalMonsters[id].sprite.x - 7, LocalMonsters[id].sprite.y - 40);
      LocalMonsters[id].sprite.healthBar.setPercent(monstersFromServer[id].health);

      //this is questionable and could lead to a very hard to debug desync issue if the monsters
      //are dying on the survivor side but not the GM side. It also might be unnecessary
      //Leaving it in for now to see how it goes. To anyone coming here to debug, we're doing the same thing with the teammate object
      if (monstersFromServer[id].health <= 0) {
        LocalMonsters[id].kill();
      }

      //if the player already exists, just move them
        LocalMonsters[id].sprite.x = monstersFromServer[id].x;
        LocalMonsters[id].sprite.y = monstersFromServer[id].y;
        LocalMonsters[id].sprite.animations.play(monstersFromServer[id].animation);

      // } else {
      //   LocalMonsters[id].sprite.animations.stop();
      //   LocalMonsters[id].sprite.frame = 7;
      // }
    //otherwise we create them at the place they need to be
    } else if (monstersFromServer[id].x) {
      LocalMonsters[id] = new shallowMonster(id, this, monstersFromServer[id].x, monstersFromServer[id].y, monstersFromServer[id].name);
    }
  }
}

export {shallowMonsterUpdate, LocalMonsters};
