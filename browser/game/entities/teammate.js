

export default class Teammate {
  constructor(id, game, xcord, ycord){
    this.id = id
    this.game = game
    this.create(xcord, ycord);
  }

  create(xcord, ycord) {
    //double check coordinates being passed in
    this.sprite = this.game.add.sprite(xcord, ycord, 'dude');
    this.sprite.anchor.set(0.5);
    //how do we handle animations for other players?
  }
};
