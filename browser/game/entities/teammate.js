

export default class Teammate {
  constructor(id, game, position){
    this.id = id
    this.game = game
    this.create(position);
  }

  create(position) {
    //double check coordinates being passed in
    this.sprite = this.game.add.sprite(position.x, position.y, 'dude')
    //how do we handle animations for other players?
  }
}