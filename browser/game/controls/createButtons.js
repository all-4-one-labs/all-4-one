import { gameMaster } from '../engine/create.js';

let dashboard;

function createButtons() {

    /// last three numbers is overFrame, outFrame, downFrame
    let dock = this.game.add.sprite(40, 640, 'dock');
    let crosshair = this.game.add.button(100, 680, 'crosshair', clickEvent, this, 0, 0, 0);
    let mummyC = this.game.add.button(250, 680, 'mummyC', clickEvent, this, 2, 1, 5);
    let lurkerC = this.game.add.button(500, 680, 'lurkerC', clickEvent, this, 2, 1, 5);
    let slimeB = this.game.add.button(750, 680, 'slimeB', clickEvent, this, 2, 1, 5);
    let sentryC = this.game.add.button(1000, 680, 'sentryC', clickEvent, this, 2, 1, 5);


    dock.width = 1200;
    dock.fixedToCamera = true;

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

    sentryC.height = 30;
    sentryC.width = 30;
    sentryC.fixedToCamera = true;

    dashboard = this.game.add.group();
    dashboard.add(dock);
    dashboard.add(crosshair);
    dashboard.add(mummyC);
    dashboard.add(lurkerC);
    dashboard.add(slimeB);
    dashboard.add(sentryC);


    //Hotkeys
    let key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(clickEvent, this.game, 0, crosshair);

    let key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key2.onDown.add(clickEvent, this.game, 0, mummyC);

    let key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key3.onDown.add(clickEvent, this.game, 0, lurkerC);

    let key4 = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    key4.onDown.add(clickEvent, this.game, 0, slimeB);

    let key5 = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    key5.onDown.add(clickEvent, this.game, 0, sentryC);

}

function clickEvent(button, hotkey) {
    if (button.key) gameMaster.button = button;
    else {
        gameMaster.button = hotkey;

        //mimic a button press
        let over = gameMaster.button._onOverFrame;
        let out = gameMaster.button._onOutFrame;
        let down = gameMaster.button._onDownFrame;

        gameMaster.button.setFrames(over, down, out);
        setTimeout(() => {
            gameMaster.button.setFrames(over, out, down);
        }, 100)
    }
}


export { createButtons, dashboard };
