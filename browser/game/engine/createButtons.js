let clickedMonster;


function createButtons(monster) {
    let mummyC = this.game.add.button(400, 680, 'mummyC', clickMonster, this, 2, 1, 0);
    let lurkerC = this.game.add.button(600, 680, 'lurkerC', clickMonster, this, 2, 1, 0);
    let slimeB = this.game.add.button(800, 680, 'slimeB', clickMonster, this, 2, 1, 0);

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
    clickedMonster = id.key;
}

export { createButtons, clickedMonster };
