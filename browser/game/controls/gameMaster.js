import { spawnMonster } from './gameMasterControls.js';
import { createButtons, clickedMonster } from '../engine/createButtons.js';

export default class GameMaster {
    constructor(game){
        this.game = game
        this.nextMonster = 0
        this.create = this.create.bind(this)
    }

    create() {
        createButtons.call(this);
    }

    update() {
        spawnMonster.call(this, clickedMonster);
    }

}
