export default function preload() {
  console.log('I AM THE PRELOAD FILE ')
  this.load.image('ground', 'assets/sky.png');
  this.load.image('wall', 'assets/platform.png');
  this.load.spritesheet('dude', 'assets/player-topdown.png', 150, 117, -1, 0, 0);
  this.load.image('bullet', 'assets/bullet.png');

}


//150, 117
