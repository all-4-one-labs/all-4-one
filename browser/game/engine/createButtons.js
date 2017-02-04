import { gameMaster } from './create.js';

function createButtons() {
    let crosshair = this.game.add.button(250, 680, 'crosshair', clickCrosshair, this, 0, 0, 0);
    let mummyC = this.game.add.button(550, 680, 'mummyC', clickMonster, this, 2, 1, 0);
    let lurkerC = this.game.add.button(850, 680, 'lurkerC', clickMonster, this, 2, 1, 0);
    let slimeB = this.game.add.button(1150, 680, 'slimeB', clickMonster, this, 2, 1, 0);

    crosshair.height = 30;
    crosshair.width = 30;

    mummyC.height = 30;
    mummyC.width = 30;

    lurkerC.height = 30;
    lurkerC.width = 30;

    slimeB.height = 30;
    slimeB.width = 30;

    mummyC.fixedToCamera = true;
    lurkerC.fixedToCamera = true;
    slimeB.fixedToCamera = true;
    // button.onInputOver.add(over, this);
    // button.onInputOut.add(out, this);
    // button.onInputUp.add(up, this);
}

function clickMonster(id) {
    gameMaster.monster = id.key;
    gameMaster.crosshair = undefined;
}

function clickCrosshair(id) {
    gameMaster.crosshair = id.key;
    gameMaster.monster = undefined;
}

export { createButtons };
