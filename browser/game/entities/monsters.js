// import {healthBarsGroup} from '../engine/create.js'
import HealthBar from './HealthBar.js';
import mapArray from './map.js';
import { flyingMonstersGroup } from '../engine/create.js';
import easystarjs from 'easystarjs';
let easystar = new easystarjs.js();
//120 x 80 (32px each)

let grid = [];
for (let i = 0; i < mapArray.length; i += 120) {
  grid.push(mapArray.slice(i, i + 120));
}
easystar.setGrid(grid);
easystar.setAcceptableTiles([0]);

export default class Monster {

  constructor(game, spawnLocation, monster){
    this.game = game;
    this.spawnLocation = spawnLocation;
    this.monster = monster;
    this.create(monster);
    this.pathHelper = this.pathHelper.bind(this);
    this.nextPathfinding = 0;
    this.animation = 'idle';
    this.totalHealth = this.monster.health;
    this.fly = monster.flying;
  }

  create(monster) {
    this.sprite = this.game.add.sprite(this.spawnLocation.x, this.spawnLocation.y, monster.name);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.setTo(monster.scale);
    this.sprite.animations.add('idle', monster.animations.idle, 20, true);
    this.sprite.animations.add('left', monster.animations.left, 20, true);
    this.sprite.animations.add('right', monster.animations.right, 20, true);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(...monster.body);
    this.sprite.health = monster.health;
    this.sprite.healthBar = new HealthBar(this.game, {width: 70, height: 10, x: this.sprite.x - 7, y: this.sprite.y - 40, bar: {color: '#ed2a2a'}, bg: {color: 'black'}});
    this.sprite.nextAttack = 0;
    this.sprite.attackRate = monster.attackRate;
    this.sprite.attack = monster.attack;
    this.sprite.speed = monster.speed;
    this.sprite.nextExplosion = 0;
  }

  pathHelper(path) {
    if (path && path.length > 0) {
      this.game.physics.arcade.moveToXY(this.sprite, path[1].x * 32, path[1].y * 32, this.sprite.speed);
    } else {
      this.game.physics.arcade.moveToXY(this.sprite, 1920, 1280, this.sprite.speed);
    }
  }

  update(playerX, playerY, distanceToClosest) {
    let pathfindingRate;
    if (distanceToClosest > 1000) {
      pathfindingRate = 1500;
    } else if (distanceToClosest > 500) {
      pathfindingRate = 1000;
    } else {
      pathfindingRate = 500;
    }
    if (playerX < this.sprite.x) {
      this.sprite.animations.play('left');
      this.animation = 'left';
    }
    else if (playerX > this.sprite.x) {
      this.sprite.animations.play('right');
      this.animation = 'right';
    }

    if (this.game.time.now > this.nextPathfinding) {
      this.nextPathfinding = this.game.time.now + pathfindingRate;
      let gridMonster = {x: Math.round(this.sprite.x / 32), y: Math.round(this.sprite.y / 32)};
      let gridPlayer = {x: Math.round(playerX / 32), y: Math.round(playerY / 32)};
      if (gridMonster.x > 119) gridMonster.x = 119;
      if (gridMonster.y > 79) gridMonster.y = 79;
      if (gridPlayer.x > 119) gridPlayer.x = 119;
      if (gridPlayer.y > 79) gridPlayer.y = 79;

      if (this.fly) {
        this.game.physics.arcade.moveToXY(this.sprite, playerX, playerY, this.sprite.speed);
        flyingMonstersGroup.add(this.sprite);
      }
      else {
        easystar.findPath(gridMonster.x, gridMonster.y, gridPlayer.x, gridPlayer.y, (path) => this.pathHelper(path));
        easystar.setIterationsPerCalculation(750);
        easystar.enableDiagonals();
        easystar.calculate();
      }
    }

    this.sprite.healthBar.setPosition(this.sprite.x - 7, this.sprite.y - 40);
    this.sprite.healthBar.setPercent(this.sprite.health, this.totalHealth);
  }
}
