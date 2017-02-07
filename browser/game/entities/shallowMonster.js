// import {healthBarsGroup} from '../engine/create.js'
import HealthBar from './HealthBar.js';
import monsterDictionary from '../controls/monsterDictionary.js';

export default class shallowMonster {
  constructor(id, game, xCord, yCord, name){
    this.id = id;
    this.game = game;
    this.monster = monsterDictionary[name]
    this.create(xCord, yCord);
    this.totalHealth = this.monster.health;
  }

  create(xCord, yCord) {
    this.sprite = this.game.add.sprite(xCord, yCord, this.monster.name);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.setTo(this.monster.scale);
    this.sprite.animations.add('idle', this.monster.animations.idle, 20, true);
    this.sprite.animations.add('left', this.monster.animations.left, 20, true);
    this.sprite.animations.add('right', this.monster.animations.right, 20, true);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(...this.monster.body)
    this.sprite.health = this.monster.health;
    this.sprite.nextAttack = 0;
    this.sprite.attackRate = this.monster.attackRate;
    this.sprite.attack = this.monster.attack;
    this.sprite.body.immovable = true;
    this.sprite.healthBar = new HealthBar(this.game, {width: 70, height: 10, x: this.sprite.x - 7, y: this.sprite.y - 40, bar: {color: '#ed2a2a'}, bg: {color: 'black'}});
    // healthBarsGroup.add(this.sprite.healthBar)

  }

  kill() {
    this.sprite.kill();
    this.sprite.healthBar.kill();
  }
}
