import { spawnMonster, crosshairCheck } from './gameMasterControls.js';
import { createButtons } from '../engine/createButtons.js';

export default class GameMaster {
    constructor(game){
        this.game = game
        this.nextMonster = 0
        this.create = this.create.bind(this);
        this.monster = undefined;
        this.crosshair = undefined;
    }

    create() {
        createButtons.call(this);
    }

    update() {
        if (this.crosshair) {
            crosshairCheck.call(this);
        }
        if (this.monster) {
            spawnMonster.call(this, this.monster);
        }
    }

}
