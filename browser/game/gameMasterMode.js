import Player from './entities/players.js';
import Bullets from './entities/bullets.js';
import Wall from './entities/mapObjects.js';
import socket from '../socket';


var player;
var walls;
var cursors;
var wasd;
var fireRate = 400;
var monsterRate = 1000;
var bullets;
let teammates = {};

export default class GameMaster {
    constructor(game){
        this.game = game;
    }

    create() {
        var game = this;

        //player
        player = new Player(socket.id, game);


        //monster
        // monster = new Monster(id, game);

        //bullets
        bullets = new Bullets(game);

        //button
        //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);

    }


}




export {player, walls, cursors, wasd, fireRate, monsterRate, bullets, teammates};
