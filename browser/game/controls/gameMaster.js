import { spawnMonster } from './gameMasterControls.js'

export default class GameMaster {
    constructor(game){
        this.game = game
        this.nextMonster = 0
        this.create = this.create.bind(this)
    }

    create() {
        // this.button = this.game.add.button(0, 0, 'button', actionOnClick, this)
    }

    update() {
      spawnMonster.call(this)
    }

}
