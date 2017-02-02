import store from '../../store'
import Survivor from '../controls/survivor.js';
import GameMaster from '../controls/gameMaster.js';
import socket from '../../socket'
import Bullets from '../entities/bullets.js';

let player, bullets, playerCollide, teamBullet, survivor, gameMaster;
let teammates = {}

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

    const emitClient = () => {
      setInterval(() => {
          let state = store.getState();
          socket.emit('send_all_data', state);
        }, 1000/30);
    }
    emitClient()
}

export {player, bullets, teammates, teamBullet, playerCollide, survivor, gameMaster};
