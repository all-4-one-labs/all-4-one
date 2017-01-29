import {player, bullets, walls, cursors, wasd, fireRate, teammates} from './create.js';
import { monsters } from './controls.js';
import socket from '../socket';
import Teammate from './entities/teammate.js';

// require('./app.js')(io);

export default function update() {
    //  Collision
    this.physics.arcade.collide(player.player, walls.walls);
    this.physics.arcade.collide(bullets.bullets, walls.walls, (bullets, walls) => bullets.kill());
    for (let i = 0; i < monsters.length; i++) {
        monsters[i].update(player.player.x, player.player.y);
        this.physics.arcade.collide(player.player, monsters[i].monster, (player, monster) => {
            // monster.kill();
            // console.log(monster);
            // console.log(this.game.time.now);
            console.log(player.health);
            if (this.game.time.now > monster.nextAttack) {
                monster.nextAttack = this.game.time.now + monster.attackRate;
                player.health -= 20;
            }
            if (player.health <= 0) {
                player.kill();
            }
        });
        this.physics.arcade.collide(monsters[i].monster, walls.walls);
        this.physics.arcade.collide(bullets.bullets, monsters[i].monster, (monster, bullet) => {
            bullet.kill();
            monster.health -= 20;
            if (monster.health <= 0 ) {
                monster.kill();
                monsters.splice(i, 1);
            }
        });
    }

    player.update();


    // if (socket) {
    //     socket.emit('move', player.player.position)
    // }

    // socket.on('player_data', (data) => {
    //     //this functions needs to do the following:
    //     //iterate through the players object and:
    //     //  create a new shallow player sprite for each new other player
    //     //  update the positions of all preexisting other players
    //     //  probably not do anything with the local players position(maybe we can handle big discrepancies server-side?)
    //     for (let id in data) {
    //         if (id !== player.id) {
    //             //if the player already exists, just move them
    //             //otherwise create them at the place they need to be
    //             if (teammates[id]){
    //                 teammates[id].sprite.position = data[id].position
    //             } else {
    //                 //TODO finish constructing
    //                 teammates[id] = new Teammate(id, this, data[id].position)
    //             }
    //         }
    //     }
    // });
}
