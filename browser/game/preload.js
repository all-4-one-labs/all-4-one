export default function preload() {
  this.load.image('ground', 'assets/sky.png');
  this.load.image('wall', 'assets/platform.png');
  this.load.spritesheet('dude', 'assets/player-topdown.png', 150, 117);
  this.load.image('bullet', 'assets/bullet.png');
  this.load.spritesheet('monster', 'assets/dinosaur.png', 80 , 56);
  //this.load.image('button', 'assets/utton.png');
}

