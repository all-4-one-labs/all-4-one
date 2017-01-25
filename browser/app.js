import 'pixi';
import 'p2';
import 'phaser';

import eEmitter from './event-emitter.js';
import game from './game.js';


let EventEmitter = function () {
	this.subscribers = {};
};
eEmitter(EventEmitter);


// we need this socket object to send messages to our server 
var socket = io(window.location.origin); 

socket.on('connect', function(){

  console.log('I have made a persistent two-way connection to the server!'); 
  

  // // the draw event is emitted in whiteboard.js and caught here
  // whiteboard.on('draw', function toBeRunOnlyOnDraw(start, end, color){
  //     socket.emit('imDrawing', start, end, color)
  // })

  // socket.on('otherDraw', function(start, end, color){
  //   whiteboard.draw(start, end, color)
  // })
  
})
