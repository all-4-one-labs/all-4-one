//TODO: make this the entry point for the frontend,
//rendering app and invoking sockets
import 'pixi';
import 'p2';
import 'phaser';

import game from './game/game.js';
import store from './store';
import { initializeSocket, emitClient } from './socket';

initializeSocket();
emitClient();

