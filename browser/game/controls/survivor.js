import Player from '../entities/players.js';
import socket from '../../socket';
import Bullets from '../entities/bullets.js';
import {player, playerCollide} from '../engine/create.js';

export default class Survivor {
    constructor(game){
        this.game = game;
        this.createPlayer = this.createPlayer.bind(this);
        this.createBullets = this.createBullets.bind(this);
        this.update = this.update.bind(this);
    }
    createPlayer() {
        return new Player(socket.id, this.game);
    }
    createBullets() {
        return new Bullets(this.game);
    }
    update() {
        player.update();
        this.game.physics.arcade.collide(player.player, playerCollide);

    }

}
