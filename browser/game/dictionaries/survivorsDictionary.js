const survivorsDictionary = {
  gunner: {
    name: 'gunner',
    scale: 1,
    animations: {
      up: [9, 10, 11],
      down: [0, 1, 2],
      left: [3, 4, 5],
      right: [6, 7, 8]
    },
    attackType: 'fireBullet',
    totalHealth: 100,
    fireRate: 300,
    damage: 20,
  },
  mage: {
    name: 'mage',
    scale: 1,
    animations: {
      up: [9, 10, 11],
      down: [0, 1, 2],
      left: [3, 4, 5],
      right: [6, 7, 8]
    },
    attackType: 'rangeSplash',
    attackAnimations: {
      sheetName: 'explosion',
      animate: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      animateBack: [31, 30, 29, 28, 27, 26, 25, 24, 23, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    },
    totalHealth: 100,
    fireRate: 1200,
    damage: 20,
  },
  shotgunner: {
    name: 'shotgunner',
    scale: 1,
    animations: {
      up: [9, 10, 11],
      down: [0, 1, 2],
      left: [3, 4, 5],
      right: [6, 7, 8]
    },
    attackType: 'fireBullet',
    shotgun: true,
    totalHealth: 100,
    fireRate: 1000,
    damage: 15,
  },
};

export default survivorsDictionary