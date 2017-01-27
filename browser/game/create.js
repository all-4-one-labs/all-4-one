import Player from './entities/players.js'
import Monster from './entities/monsters.js'

var player;
var walls;
var cursors;
var wasd;
var fireRate = 400;
var button;
var monster;
var bullets;

export default function create() {
    var game = this;

    //temporary for testing purposes
    let id = 1
    //this settings
    game.world.setBounds(-1000, -1000, 2000, 2000);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(-1000, -1000, 2000, 2000, 'ground');

    //walls
    walls = game.add.group();
    walls.enableBody = true;
    var wall = walls.create(400, 400, 'wall');
    wall.body.immovable = true;
    wall = walls.create(-150, 250, 'wall');
    wall.body.immovable = true;

    //player
    player = new Player(id, game);


    //monster
    monster = new Monster(id, game);

    //bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    game.physics.arcade.enable(bullets);
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    //button
    //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);

}

export {player, walls, cursors, wasd, fireRate, monster, bullets};

