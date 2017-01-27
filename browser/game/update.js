import {player, bullets, walls, cursors, wasd, fireRate, monster} from './create.js'

// require('./app.js')(io);


// var nextFire = 0;

export default function update() {
    //  Collision
    // broken
    this.physics.arcade.collide(player, walls);
    this.physics.arcade.collide(player, monster);
    this.physics.arcade.collide(monster, walls);
    this.physics.arcade.collide(bullets, walls, (bullets, walls) => bullets.kill());
    this.physics.arcade.collide(bullets, monster, (monster, bullet) => {
        bullet.kill();
        monster.health -= 20;
        if (monster.health === 0 ) monster.kill();
    });

    player.update();
    //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;
    // player.body.velocity.y = 0;

    // if (wasd.left.isDown)
    // {
    //     //  Move to the left
    //     player.body.velocity.x = -150;

    //     player.animations.play('left');
    // }
    // else if (wasd.right.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.x = 150;

    //     player.animations.play('right');
    // }
    // else if (wasd.up.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.y = -150;

    //     player.animations.play('up');
    // }
    // else if (wasd.down.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.y = 150;

    //     player.animations.play('down');
    // }
    // else
    // {
    //     //  Stand still
    //     player.animations.stop();
    //     player.frame = 0;
    // }

    if (socket) {
        socket.emit('move', player.worldPosition)
    }

    socket.on('sendMove', (data) => {
        player.y = data.y;
        player.x = data.x;
    })


// function fire(direction) {
//         if (tempGame.time.now > nextFire && bullets.countDead() > 0) {
//                 nextFire = tempGame.time.now + fireRate;
//                 var bullet = bullets.getFirstDead();
//                 bullet.scale.setTo(0.5);
//                 bullet.reset(player.x, player.y);
//                 switch(direction) {
//                     case 'left' : tempGame.physics.arcade.moveToXY(bullet, -1000, player.y, 500); break;
//                     case 'right': tempGame.physics.arcade.moveToXY(bullet, 1000, player.y, 500); break;
//                     case 'up': tempGame.physics.arcade.moveToXY(bullet, player.x, -1000, 500); break;
//                     case 'down': tempGame.physics.arcade.moveToXY(bullet, player.x, 1000, 500); break;
//                     case 'up-left': tempGame.physics.arcade.moveToXY(bullet, player.x - 1000, player.y - 1000, 500); break;
//                     case 'up-right': tempGame.physics.arcade.moveToXY(bullet, player.x + 1000, player.y - 1000, 500); break;
//                     case 'down-left': tempGame.physics.arcade.moveToXY(bullet, player.x - 1000, player.y + 1000, 500); break;
//                     case 'down-right': tempGame.physics.arcade.moveToXY(bullet, player.x + 1000, player.y + 1000, 500); break;
//                 }
//     }
// }

    // if (cursors.up.isDown && cursors.left.isDown)
    // {
    //     fire('up-left');
    // }
    // else if (cursors.up.isDown && cursors.right.isDown)
    // {
    //     fire('up-right');
    // }
    // else if (cursors.down.isDown && cursors.left.isDown)
    // {
    //     fire('down-left');
    // }
    // else if (cursors.down.isDown && cursors.right.isDown)
    // {
    //     fire('down-right');
    // }
    // else if (cursors.left.isDown)
    // {
    //     fire('left');
    // }
    // else if (cursors.right.isDown)
    // {
    //     fire('right');
    // }
    // else if (cursors.up.isDown)
    // {
    //     fire('up');
    // }
    // else if (cursors.down.isDown)
    // {
    //     fire('down');
    // }

}
