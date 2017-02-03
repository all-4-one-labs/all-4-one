import store from '../store'
import Survivor from './survivorMode.js';

let player, bullets, playerCollide, teamBullet, testText;
let teammates = {} //TODO: on the backend .on('connection'), populate this with existing players instead of waiting for the first interval

// import Player from './entities/players.js';
import Bullets from './entities/bullets.js';
// // import Wall from './entities/mapObjects.js';
// import socket from '../socket';


// var player;
// var walls;
// var cursors;
// var wasd;
// var fireRate = 400;
// var monsterRate = 1000;
// var button;
// var bullets;
// let id = 0;

// let teammates = {};
// let map, groundLayer, featuresBottom, playerOnBottom, playerOnTop, playerBehindBottom, playerBehindTop, playerCollide;
//TODO: on the backend .on('connection'), populate this with existing players instead of waiting for the first interval

export default function create() {
    //temporary for testing purposes
    //this settings
    //120 x 80 (32px each)
    this.world.setBounds(-1920, -1280, 3840, 2560);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    // create map, order matters!
    let map = this.add.tilemap('tilemap');
    map.addTilesetImage('terrain_atlas', 'tileset');

//     let layer = map.createLayer('Bottom');
//     playerCollide = map.createLayer('landscapeCollision')
//     layer.resizeWorld();
//     map.setCollisionBetween(1,2000, true, 'landscapeCollision')
//     map.createLayer('bottomOver');
//     map.createLayer('topOver');

    // different logic depending on survivor or gamemaster

    playerCollide = map.createLayer('playerCollide');

    let groundLayer = map.createLayer('groundLayer');
    let featuresBottom = map.createLayer('featuresBottom');

    groundLayer.resizeWorld();
    map.setCollisionBetween(1, 2000, true, 'playerCollide');

    let playerOnBottom = map.createLayer('playerOnBottom');
    let playerOnTop = map.createLayer('playerOnTop');
//     player = new Player(socket.id, this);

    if (store.getState().gameMode === 'survivor') {
        let survivor = new Survivor(this);
        player = survivor.createPlayer();
        bullets = survivor.createBullets();
    }

    let playerBehindBottom = map.createLayer('playerBehindBottom');
    let playerBehindTop = map.createLayer('playerBehindTop');

    teamBullet = new Bullets(this);
   
    let text = '15:00';
    let style = { font: "24px Arial", fill: "#ff0044", align: "center" };
    testText = this.add.text(1215, 0, text, style)
    testText.fixedToCamera = true
    //button
    //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);
}

export {player, bullets, teammates, teamBullet, playerCollide, testText};
