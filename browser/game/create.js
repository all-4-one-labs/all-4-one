import Player from './entities/players.js';
import Bullets from './entities/bullets.js';
// import Wall from './entities/mapObjects.js';
import socket from '../socket';

import Survivor from './survivorMode.js';

let player, bullets, collideLayer, teamBullet;
let teammates = {} //TODO: on the backend .on('connection'), populate this with existing players instead of waiting for the first interval
 //TODO: on the backend .on('connection'), populate this with existing players instead of waiting for the first interval

export default function create() {
    //temporary for testing purposes
    //this settings
    this.world.setBounds(-1000, -1000, 2000, 2000);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.tileSprite(-1000, -1000, 2000, 2000, 'ground');
    
    // map, order matters!
    let map = this.add.tilemap('tilemap');
    map.addTilesetImage('terrain_atlas', 'tileset')
    let layer = map.createLayer('Bottom');
    collideLayer = map.createLayer('landscapeCollision')
    layer.resizeWorld();
    map.setCollisionBetween(1,2000, true, 'landscapeCollision')

    map.createLayer('bottomOver');
    map.createLayer('topOver')

    // different logic depending on survivor or gamemaster
    
    // let survivor = new Survivor(this);
    // survivor.create();

            //player
        player = new Player(socket.id, this);
        //bullets
        bullets = new Bullets(this);


    teamBullet = new Bullets(this);
    map.createLayer('fringe');
    //walls
    // walls = new Wall(this);
    //button
    //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);
}

export {player, bullets, teammates, teamBullet, collideLayer};
