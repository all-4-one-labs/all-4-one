export default class Wall {
  constructor(game){
    this.game = game;
    this.create();
  }

  create() {
    this.walls = this.game.add.group();
    this.walls.enableBody = true;
    this.wall = this.walls.create(400, 400, 'wall');
    this.wall.body.setSize(320, 1, 45, 0);
    this.wall.body.immovable = true;
    this.wall = this.walls.create(-150, 250, 'wall');
    this.wall.body.immovable = true;
  }

}