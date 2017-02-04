import { spawnMonster, crosshairCheck } from './gameMasterControls.js';
import { createButtons } from '../engine/createButtons.js';

export default class GameMaster {
    constructor(game){
        this.game = game
        this.nextMonster = 0
        this.create = this.create.bind(this);
        this.button = undefined;
    }

    create() {
        createButtons.call(this);
    }

    update() {
        if (this.button && this.button.key === 'crosshair') crosshairCheck.call(this);
        else if (this.button) {
            spawnMonster.call(this, this.button.key);
        }
    }

}
