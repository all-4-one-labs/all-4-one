import { gameMaster } from '../engine/create.js';
import monsterDictionary from '../dictionaries/monsterDictionary.js';

let dashboard;
let prevButton = {};

function createButtons() {

    /// last three numbers is overFrame, outFrame, downFrame, upFrame. we don't want it to change since physically clicking the buttons don't do anything. Use hotkeys instead
    let begin = 250;
    let increment = 150;
    let dock = this.game.add.sprite(40, 640, 'dock');
    let crosshair = this.game.add.button(begin, 680, 'crosshair', doNothing, this, 0, 0, 0, 0);
    let mummyC = this.game.add.button(begin + increment, 680, 'mummyC', doNothing, this, 2, 2, 2, 2);
    let lurkerC = this.game.add.button(begin + increment * 2, 680, 'lurkerC', doNothing, this, 2, 2, 2, 2);
    let slimeB = this.game.add.button(begin + increment * 3, 680, 'slimeB', doNothing, this, 2, 2, 2, 2);
    let sentryC = this.game.add.button(begin + increment * 4, 680, 'sentryC', doNothing, this, 2, 2, 2, 2);
    let earthSmallerB = this.game.add.button(begin + increment * 5, 680, 'earthSmallerB', doNothing, this, 0, 0, 0, 0);

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

    earthSmallerB.height = 30;
    earthSmallerB.width = 30;
    earthSmallerB.fixedToCamera = true;

    dashboard = this.game.add.group();
    dashboard.add(dock);
    dashboard.add(crosshair);
    dashboard.add(mummyC);
    dashboard.add(lurkerC);
    dashboard.add(slimeB);
    dashboard.add(sentryC);
    dashboard.add(earthSmallerB);


    //Hotkeys - third argument is priority
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

    let key6 = this.game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    key6.onDown.add(clickEvent, this.game, 0, earthSmallerB);

}

function doNothing() {
    //fake function. use hotkeys to 'click' buttons
}

function clickEvent(button, hotkey) {
        if (prevButton.key !== 'crosshair' && Object.keys(prevButton).length !== 0) prevButton.frame = monsterDictionary[prevButton.key].upFrame;
        gameMaster.button = hotkey;
        prevButton = gameMaster.button;

        //mimic a button press
        if (hotkey.key !== 'crosshair') {
            let down = monsterDictionary[hotkey.key].downFrame;
            gameMaster.button.frame = down;
        }
}

export { createButtons, dashboard };
