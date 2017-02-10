/*
Monster Dictionary:
  To add a monster, first, add this logic to createButton.js:
  let monsterNameInPreload = this.game.add.button(400, 680, 'monsterNameInPreload', clickMonster, this, 2, 1, 0);
  also don't forget to create a hotkey too and add it to the dashboard!

  In monsterDictionary object, add
    monsterNameInPreload: {
      name: monsterNameInPreload,
      scale: 2 (if sprite 16x16, otherwise 1 if sprite 32x32),
      animations: {
        idle: [],
        left: [],
        right: []
      },
      body: [] for bounds size,
      health: #,
      attackRate: # (1000 = once per second, 500 = twice per second),
      attack: # (power of attack, how much health will be taken off player),
      speed: # (how many pixels moved per 1 second),
      spawnRate: how fast to spawn,
      flying: boolean; true if it flies in the air (aka no collision with walls),
      overFrame: frame for when mouse goes over button; not used currently,
      outFrame: frame for when mouse exits button; not used currently,
      downFrame: frame for when button is 'clicked'; used for when monster has been chosen by hotkey,
      upFrame: frame for when button is no longer 'clicked'; default frame for monster,
      unclickableFrame: frame to show when monster is in cooldown phase
    }
*/

const monsterDictionary = {
  mummyC: {
    name: 'mummyC',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      left: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      right: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    body: [12, 12, 2, 4],
    health: 250,
    attackRate: 1000,
    attack: 10,
    speed: 200,
    spawnRate: 4000,
    flying: false,
    overFrame: 2,
    outFrame: 1,
    downFrame: 5,
    upFrame: 2,
    unclickableFrame: 3
  },
  lurkerC: {
    name: 'lurkerC',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3, 4],
      left: [0, 1, 2, 3, 4],
      right: [0, 1, 2, 3, 4]
    },
    body: [12, 12, 2, 4],
    health: 450,
    attackRate: 1000,
    attack: 20,
    speed: 170,
    spawnRate: 5000,
    flying: false,
    overFrame: 2,
    outFrame: 1,
    downFrame: 5,
    upFrame: 2,
    unclickableFrame: 3
  },
  slimeB: {
    name: 'slimeB',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      left: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      right: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    },
    body: [12, 12, 2, 4],
    health: 100,
    attackRate: 1000,
    attack: 15,
    speed: 220,
    spawnRate: 3000,
    flying: false,
    overFrame: 2,
    outFrame: 1,
    downFrame: 5,
    upFrame: 2,
    unclickableFrame: 3
  },
  sentryC: {
    name: 'sentryC',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3],
      left: [0, 1, 2, 3],
      right: [12, 13, 14, 15]
    },
    body: [12, 12, 2, 4],
    health: 200,
    attackRate: 1000,
    attack: 20,
    speed: 180,
    spawnRate: 4000,
    flying: false,
    overFrame: 2,
    outFrame: 1,
    downFrame: 5,
    upFrame: 2,
    unclickableFrame: 3
  },
  earthSmallerB: {
    name: 'earthSmallerB',
    scale: 2,
    animations: {
      idle: [0, 1, 2, 3],
      left: [0, 1, 2, 3],
      right: [0, 1, 2, 3]
    },
    body: [12, 12, 2, 4],
    health: 150,
    attackRate: 1000,
    attack: 15,
    speed: 200,
    spawnRate: 4500,
    flying: true,
    overFrame: 2,
    outFrame: 1,
    downFrame: 3,
    upFrame: 0,
    unclickableFrame: 2
  }
};

export default monsterDictionary;
