import { bullets, player, testText, gameMaster } from './create.js';
import { playerCollide, bulletCollide } from './createMap.js';
import { monsters } from '../controls/gameMasterControls.js';
import store from '../../store.js';
import { updateHealth } from '../../reducers/players.js';
import { teammateUpdate } from './teammateUpdate.js';


export default function update() {
  //test text
  let time = store.getState().game.time
  testText.setText(time)
  if (time[0] === '0' && time[1] === '0') testText.setStyle({ font: "24px Arial", fill: "#ff0044", align: "center" })
  // this.game.paused = true
  //  Collision


  // Checks which gameMode was chosen and updates appropriately
  if (store.getState().gameMode === 'survivor') {
    player.update()
    teammateUpdate.call(this, player);
    this.physics.arcade.collide(player.sprite, playerCollide)
  } else if (store.getState().gameMode === 'gamemaster') {
    gameMaster.update()
    teammateUpdate.call(this, 'gm');
  }
  this.physics.arcade.collide(bullets.sprite, bulletCollide, (bullet) => {
    bullet.kill();
  })

//   lines 32 and 33 now in if statement on line 19
//   this.physics.arcade.collide(player.sprite, playerCollide)
//   player.update();
  // store.dispatch(updateHealth({health: player.player.health}));
  // console.log('this is the store', store.getState());

  //player win
  if (store.getState().game.timeUp) {
      let winMessageText = 'SURVIVORS WIN';
      let winMessageStyle = { font: '96px Arial', fill: '#ff0044', align: 'center' };
      let winMessage = this.add.text(240, 300, winMessageText, winMessageStyle)
      winMessage.fixedToCamera = true
      this.game.paused = true
   }
  //handle monsters
  //#gamemaster - maybe? not sure how this logic is going to work
  for (let i = 0; i < monsters.length; i++) {

    if (player) { 
      monsters[i].update(player.sprite.x, player.sprite.y);
      this.physics.arcade.collide(player.sprite, monsters[i].sprite, (player, monster) => {
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
    
      for (let j = 0; j < monsters.length; j++) {
          if (i !== j && monsters[j]) {
              this.physics.arcade.collide(monsters[i].sprite, monsters[j].sprite);
          }
      }
      this.physics.arcade.collide(monsters[i].sprite, playerCollide);

      this.physics.arcade.collide(bullets.sprite, monsters[i].sprite, (monster, bullet) => {
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
