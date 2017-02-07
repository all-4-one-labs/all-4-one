import { gameMaster } from '../engine/create.js';

function createButtons() {
    let dock = this.game.add.sprite(40, 640, 'dock');
    let crosshair = this.game.add.button(120, 680, 'crosshair', clickMonster, this, 0, 0, 0);
    let mummyC = this.game.add.button(420, 680, 'mummyC', clickMonster, this, 2, 1, 5);
    let lurkerC = this.game.add.button(720, 680, 'lurkerC', clickMonster, this, 2, 1, 5);
    let slimeB = this.game.add.button(1020, 680, 'slimeB', clickMonster, this, 2, 1, 5);

    crosshair.height = 30;
    crosshair.width = 30;
    crosshair.fixedToCamera = true;

    mummyC.height = 30;
    mummyC.width = 30;
    mummyC.fixedToCamera = true;

    lurkerC.height = 30;
    lurkerC.width = 30;
    lurkerC.fixedToCamera = true;

    slimeB.height = 30;
    slimeB.width = 30;
    slimeB.fixedToCamera = true;

    dock.width = 1200;
    dock.fixedToCamera = true;

    //Hotkeys
    let key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(clickEvent, this.game, 0, crosshair);

    let key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key2.onDown.add(clickEvent, this.game, 0, mummyC);

    let key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key3.onDown.add(clickEvent, this.game, 0, lurkerC);

    let key4 = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    key4.onDown.add(clickEvent, this.game, 0, slimeB);

}

function clickEvent(button, hotkey) {
    if (button.key) gameMaster.button = button;
    else {
        gameMaster.button = hotkey;
    }
}


export { createButtons };
