import store from '../../store';
import Survivor from '../controls/survivor.js';
import GameMaster from '../controls/gameMaster.js';
import socket from '../../socket';
import Bullets from '../entities/bullets.js';
import Explosions from '../entities/explosions.js';
import { createMapPrePlayer, createMapPostPlayer } from './createMap.js';

let player, bullets, teamBullet, survivor, gameMaster, testText, blaster, explosionsound, epicbg, darknessbg, healthBarsGroup, flyingMonstersGroup, explosions, teamExplosions;

export default function create() {
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  //sound test
  blaster = this.add.audio('blaster');
  explosionsound = this.add.audio('explosionsound');
  epicbg = this.add.audio('epicbg');
  darknessbg = this.add.audio('darknessbg');

  healthBarsGroup = this.add.group();

  //this settings
  this.world.setBounds(-1920, -1280, 3840, 2560);
  this.physics.startSystem(Phaser.Physics.ARCADE);

  // map, order matters!
  createMapPrePlayer(this);

  let playerType = sessionStorage.getItem('playerType')
  if (store.getState().gameMode === 'survivor') {
    survivor = new Survivor(this, playerType);
    player = survivor.createPlayer();
    bullets = survivor.createBullets();
  } else if (store.getState().gameMode === 'gamemaster') {
    gameMaster = new GameMaster(this);
    gameMaster.create();
    this.game.camera.x = 1000;
    this.game.camera.y = 1000;
  }

  createMapPostPlayer();

  // layer the flying monsters correctly on map
  flyingMonstersGroup = this.add.group();
  explosions = new Explosions(this);
  teamBullet = new Bullets(this);
  teamExplosions = new Explosions(this);

  let text = '10:00';
  let style = { font: "24px Arial", fill: "#ffffff", align: "center" };
  testText = this.add.text(1215, 0, text, style);
  testText.fixedToCamera = true;

  const emitClient = () => {
    setInterval(() => {
      let state = store.getState();
      socket.emit('send_all_data', {
        position: state.players.position,
        animation: state.players.animation,
        fire: state.players.fire,
        rate: state.players.rate,
        health: state.players.health,
        monsters: state.monsters,
        gameMode: state.gameMode,
        playerType: state.players.playerType
      });
    }, 1000 / 30);
  };

  this.sound.setDecodedCallback([epicbg], () => darknessbg.play('', 0, 1, true), this);

  emitClient();

}

export {player, bullets, teamBullet, survivor, gameMaster, testText, blaster, explosionsound, epicbg, darknessbg, healthBarsGroup, flyingMonstersGroup, explosions, teamExplosions };

