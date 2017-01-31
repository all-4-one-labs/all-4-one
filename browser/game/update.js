import {player, bullets, walls, cursors, wasd, fireRate, teammates} from './create.js';
import { monsters } from './controls.js';
import socket from '../socket';
import Teammate from './entities/teammate.js';
import store from '../store.js';

// require('./app.js')(io);

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

    let data = store.getState().players;

    //delete teammate if they disconnect
    for (let id in teammates) {
        if (!data[id]) {
            teammates[id].sprite.kill();
            delete teammates[id];
        }
    }
    for (let id in data) {
        if (id !== player.id) {
            //if the player already exists, just move them
            if (teammates[id]){
                this.physics.arcade.collide(player.player, teammates[id].sprite);
                if(data[id].animation !== 'stop') {

                    teammates[id].sprite.x = data[id].position.x;
                    teammates[id].sprite.y = data[id].position.y;
                    teammates[id].sprite.animations.play(data[id].animation);
                } else {
                    teammates[id].sprite.animations.stop();
                    teammates[id].sprite.frame = 0;
                }
            }
            //else create them at the place they need to be
            else if (data[id].position){
                teammates[id] = new Teammate(id, this, data[id].position.x, data[id].position.y)
            }
        }
    }

}
