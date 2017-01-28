import {player, bullets, walls, cursors, wasd, fireRate, monster} from './create.js';
import { monsters } from './controls';
// require('./app.js')(io);

export default function update() {
    //  Collision
    this.physics.arcade.collide(player, walls);
    this.physics.arcade.collide(player, monster);
    //this.physics.arcade.collide(monster, walls);
    this.physics.arcade.collide(bullets, walls, (bullets, walls) => bullets.kill());
    this.physics.arcade.collide(bullets, monster, (monster, bullet) => {
        bullet.kill();
        monster.health -= 20;
        if (monster.health === 0 ) monster.kill();
    });

    player.update();
    monsters.forEach(monster => monster.update());


    if (socket) {
        socket.emit('move', player.worldPosition)
    }

    socket.on('sendMove', (data) => {
        player.y = data.y;
        player.x = data.x;
    });
}
