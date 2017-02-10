import { spawnMonster, crosshairCheck, camera } from './gameMasterControls.js';
import { createButtons } from './createButtons.js';
import store from '../../store.js';

export default class GameMaster {
    constructor(game){
        this.game = game
        this.nextMonster = 0;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.button = undefined;
        this.maxPlayer = 1;
    }

    create() {
        createButtons.call(this);
    }

    update() {
        //crosshair and monster spawn
        camera.call(this.game);
        let numPlayers = Object.keys(store.getState().players.players).length;

        if (this.button && this.button.key === 'crosshair') crosshairCheck.call(this);
        else if (this.button && numPlayers) {
            this.maxPlayer = Math.max(this.maxPlayer, numPlayers);
            spawnMonster.call(this, this.button, this.maxPlayer);
        }
    }

}

