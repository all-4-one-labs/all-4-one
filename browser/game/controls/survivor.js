import Player from '../entities/players.js';
import socket from '../../socket';
import Bullets from '../entities/bullets.js';
import { player } from '../engine/create.js';
import { playerCollide } from '../engine/createMap.js';

export default class Survivor {
    constructor(game, playerType){
        this.game = game;
        this.playerType = playerType
        this.createPlayer = this.createPlayer.bind(this);
        this.createBullets = this.createBullets.bind(this);
        this.update = this.update.bind(this);
    }
    createPlayer() {
        return new Player(socket.id, this.game, this.playerType);
    }
    createBullets() {
        return new Bullets(this.game);
    }
    update() {
        // DO WE NEED THIS UPDATE??? Player entity already has an update method
        player.update();
        this.game.physics.arcade.collide(player.player, playerCollide);

    }

}
