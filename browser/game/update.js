import {player, bullets, walls, cursors, wasd, fireRate, teammates} from './create.js';
import { monsters } from './controls.js';
import socket from '../socket';
import Teammate from './entities/teammate.js';
import store from '../store.js';

export default function update() {
    //  Collision
    player.update();
    this.physics.arcade.collide(player.player, walls.walls);
    this.physics.arcade.collide(bullets.bullets, walls.walls, (bullets, walls) => bullets.kill());
    for (let i = 0; i < monsters.length; i++) {
        monsters[i].update(player.player.x, player.player.y);
        this.physics.arcade.collide(player.player, monsters[i].monster, (player, monster) => {
            if (this.game.time.now > monster.nextAttack) {
                monster.nextAttack = this.game.time.now + monster.attackRate;
                player.health -= 20;
                socket.emit('damage', {health: player.health});
            }
            if (player.health <= 0) {
                player.kill();
                player.healthBar.kill();
            }
        });
        this.physics.arcade.collide(monsters[i].monster, walls.walls);
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

    let players = store.getState().players;
    //delete teammate if they disconnect
    for (let id in teammates) {
        if (!players[id]) {
            teammates[id].kill();
            delete teammates[id];
        }
    }
    // console.log(players);
    for (let id in players) {
        if (id !== player.id) {
            if (teammates[id]){
            //healthbar
            teammates[id].sprite.healthBar.setPosition(teammates[id].sprite.x - 7, teammates[id].sprite.y - 40);
            teammates[id].sprite.healthBar.setPercent(players[id].health);
            if (players[id].health <= 0) {
                teammates[id].kill();
            }
            //if the player already exists, just move them
                if(players[id].animation !== 'stop') {
                    teammates[id].sprite.x = players[id].position.x;
                    teammates[id].sprite.y = players[id].position.y;
                    teammates[id].sprite.animations.play(players[id].animation);
                } else {
                    teammates[id].sprite.animations.stop();
                    teammates[id].sprite.frame = 0;
                }
            }
            //else create them at the place they need to be
            else if (players[id].position) {
                teammates[id] = new Teammate(id, this, players[id].position.x, players[id].position.y);
            }
        }
    }
}
