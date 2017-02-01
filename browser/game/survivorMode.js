import Player from './entities/players.js';
import socket from '../socket';
import Bullets from './entities/bullets.js';

// var player;
// var walls;
// var cursors;
// var wasd;
// var fireRate = 400;
// var monsterRate = 1000;
// var bullets;
// let teammates = {};

export default class Survivor {
    constructor(game){
        this.game = game;
    }

    create() {
        //player
        player = new Player(socket.id, this.game);
        //bullets
        bullets = new Bullets(this.game);
    }

}
