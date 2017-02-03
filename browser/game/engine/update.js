import { bullets, player, testText, gameMaster } from './create.js';
import { playerCollide, bulletCollide } from './createMap.js';
import { monsters } from '../controls/gameMasterControls.js';
import store from '../../store.js';
import { updateHealth } from '../../reducers/players.js';
import { teammateUpdate } from './teammateUpdate.js';


export default function update() {
  //test text
  testText.setText(store.getState().game)

  //  Collision

  // Checks which gameMode was chosen and updates appropriately
  if (store.getState().gameMode === 'survivor') {
    player.update()
    teammateUpdate.call(this, player);
    this.physics.arcade.collide(player.player, playerCollide)
  } else if (store.getState().gameMode === 'gamemaster') {
    gameMaster.update()
    teammateUpdate.call(this, 'gm');
  }
  this.physics.arcade.collide(bullets.bullets, bulletCollide, (bullet) => {
    bullet.kill();
  })

  //#gamemaster - maybe? not sure how this logic is going to work
  for (let i = 0; i < monsters.length; i++) {
    if (player) { 
      monsters[i].update(player.player.x, player.player.y);
      this.physics.arcade.collide(player.player, monsters[i].monster, (player, monster) => {
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

      this.physics.arcade.collide(bullets.bullets, monsters[i].monster, (monster, bullet) => {
        bullet.kill();
        monster.health -= 20;
        if (monster.health <= 0 ) {
          monster.kill();
          monster.healthBar.kill();
          monsters.splice(i, 1);
        }
      });
    }
  }
}
