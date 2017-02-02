import store from '../store'
import Survivor from './survivorMode.js';
import GameMaster from './gameMasterMode.js';

let player, bullets, playerCollide, teamBullet, survivor, gameMaster;
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
//120*32
//80*32

export default function create() {
    //this settings
    this.world.setBounds(-1920, -1280, 3840, 2560);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    // map, order matters!
    let map = this.add.tilemap('tilemap');
    map.addTilesetImage('terrain_atlas', 'tileset');

    playerCollide = map.createLayer('playerCollide');

    let groundLayer = map.createLayer('groundLayer');
    let featuresBottom = map.createLayer('featuresBottom');

    groundLayer.resizeWorld();
    map.setCollisionBetween(1, 2000, true, 'playerCollide');

    let playerOnBottom = map.createLayer('playerOnBottom');
    let playerOnTop = map.createLayer('playerOnTop');
//     player = new Player(socket.id, this);

    if (store.getState().gameMode === 'survivor') {
        survivor = new Survivor(this);
        player = survivor.createPlayer();
        bullets = survivor.createBullets();
    } else if (store.getState().gameMode === 'gamemaster') {
        gameMaster = new GameMaster(this);
    }

    let playerBehindBottom = map.createLayer('playerBehindBottom');
    let playerBehindTop = map.createLayer('playerBehindTop');

    teamBullet = new Bullets(this);
    //button
    //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);
}

export {player, bullets, teammates, teamBullet, playerCollide, survivor, gameMaster};
