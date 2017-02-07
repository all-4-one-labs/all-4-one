/*
Monster Dictionary:
  To add a monster, first, add this logic to createButton.js:
  let monsterNameInPreload = this.game.add.button(400, 680, 'monsterNameInPreload', clickMonster, this, 2, 1, 0);
  also don't forget to create a hotkey too!

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
      clickableFrame: frame to show when monster is available,
      unclickableFrame: frame to show when monster is in cooldown phase,
      flying: whether it flies or not
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
    health: 100,
    attackRate: 1000,
    attack: 10,
    speed: 100,
    spawnRate: 1000,
    clickableFrame: 2,
    unclickableFrame: 3,
    flying: false
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
    health: 200,
    attackRate: 1000,
    attack: 20,
    speed: 50,
    spawnRate: 1500,
    clickableFrame: 2,
    unclickableFrame: 3,
    flying: false
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
    health: 40,
    attackRate: 1000,
    attack: 20,
    speed: 150,
    spawnRate: 500,
    clickableFrame: 2,
    unclickableFrame: 3,
    flying: false
  },
  sentryC: {
    name: 'sentryC',
    scale: 2,
    animations: {
      idle: [3],
      left: [0, 1, 2, 3],
      right: [12, 13, 14, 15]
    },
    body: [12, 12, 2, 4],
    health: 80,
    speed: 100,
    spawnRate: 1500,
    clickableFrame: 2,
    unclickableFrame: 3,
    flying: true
  }
};

export default monsterDictionary;
