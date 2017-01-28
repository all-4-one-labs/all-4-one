import {player, bullets, walls, cursors, wasd, fireRate} from './create.js';
import { monster } from './controls.js';
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


    // if (socket) {
    //     socket.emit('move', player.worldPosition)
    // }

    // socket.on('sendMove', (data) => {
    //     player.y = data.y;
    //     player.x = data.x;
    // });
}
