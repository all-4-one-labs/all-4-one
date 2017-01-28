import {player, bullets, walls, cursors, wasd, fireRate} from './create.js';
import { monster } from './controls.js';
import socket from '../socket';

// require('./app.js')(io);

export default function update() {
    //  Collision
    this.physics.arcade.collide(player.player, walls.walls);
    this.physics.arcade.collide(bullets.bullets, walls.walls, (bullets, walls) => bullets.kill());
    if (monster) {
        this.physics.arcade.collide(player.player, monster.monster);
        this.physics.arcade.collide(monster.monster, walls.walls);
        this.physics.arcade.collide(bullets.bullets, monster.monster, (monster, bullet) => {
            bullet.kill();
            monster.health -= 20;
            if (monster.health <= 0 ) monster.kill();
        });
    }

    player.update();


    if (socket) {
        //should we be using worldposition?
        socket.emit('move', player.worldPosition)
    }

    socket.on('player_data', (data) => {
        //this functions needs to do the following: 
        //iterate through the players object and:
        //  create a new shallow player sprite for each new other player
        //  update the positions of alll preexisting other players
        //  probably not do anything with the local players position(maybe we can handle big discrepancies server-side?)
        player.y = data.y;
        player.x = data.x;
    });
}
