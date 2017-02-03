import store from '../../store'
import Survivor from '../controls/survivor.js';
import GameMaster from '../controls/gameMaster.js';
import socket from '../../socket'
import Bullets from '../entities/bullets.js';
import { createMapPrePlayer, createMapPostPlayer } from './createMap.js'

let player, bullets, teamBullet, survivor, gameMaster, testText;

export default function create() {
  //this settings
  this.world.setBounds(-1920, -1280, 3840, 2560);
  this.physics.startSystem(Phaser.Physics.ARCADE);

  // map, order matters!
  createMapPrePlayer(this)

  if (store.getState().gameMode === 'survivor') {
    survivor = new Survivor(this);
    player = survivor.createPlayer();
    bullets = survivor.createBullets();
  } else if (store.getState().gameMode === 'gamemaster') {
    gameMaster = new GameMaster(this);
  }

  createMapPostPlayer()

  teamBullet = new Bullets(this);

  let text = '15:00';
  let style = { font: "24px Arial", fill: "#ffffff", align: "center" };
  testText = this.add.text(1215, 0, text, style)
  testText.fixedToCamera = true

  const emitClient = () => {
    setInterval(() => {
      let state = store.getState();
      // console.log(state)
      socket.emit('send_all_data', {
        position: state.players.position, 
        animation: state.players.animation, 
        fire: state.players.fire, 
        rate: state.players.rate,
        health: state.players.health
      });
    }, 1000/30);
  }

  emitClient()
}

export {player, bullets, teamBullet, survivor, gameMaster, testText};