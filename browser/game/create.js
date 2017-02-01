import Player from './entities/players.js';
import Monster from './entities/monsters.js';
import Bullets from './entities/bullets.js';
import Wall from './entities/mapObjects.js';
import socket from '../socket';


var player;
var walls;
var cursors;
var wasd;
var fireRate = 400;
var monsterRate = 1000;
var button;
var bullets;
let id = 0;
let teammates = {};
let map, layer, topOver, bottomOver, fringe, collideLayer;
 //TODO: on the backend .on('connection'), populate this with existing players instead of waiting for the first interval
export default function create() {
    var game = this;

    //temporary for testing purposes
    //this settings
    game.add.tileSprite(-1000, -1000, 2000, 2000, 'ground');
    game.world.setBounds(-1000, -1000, 2000, 2000);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // map
    map = game.add.tilemap('tilemap');
    map.addTilesetImage('terrain_atlas', 'tileset')
    layer = map.createLayer('Bottom');
    collideLayer = map.createLayer('landscapeCollision')


    layer.resizeWorld();
    map.setCollisionBetween(1,2000, true, 'landscapeCollision')
    
    //walls
    walls = new Wall(game);
    console.log(socket)
    
    //player
    bottomOver = map.createLayer('bottomOver');
    topOver = map.createLayer('topOver')
    player = new Player(socket.id, game);

    fringe = map.createLayer('fringe');
    //monster
    // monster = new Monster(id, game);

    //bullets
    bullets = new Bullets(game);

    //button
    //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);

}

export {player, walls, cursors, wasd, fireRate, monsterRate, bullets, teammates, collideLayer};