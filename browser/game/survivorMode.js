import Player from './entities/players.js';
import socket from '../socket';
import Bullets from './entities/bullets.js';

export default class Survivor {
    constructor(game){
        this.game = game;
    }

    createPlayer() {
        return new Player(socket.id, this.game);
    }
    createBullets() {
        return new Bullets(this.game);
    }

    update() {

    }

}
