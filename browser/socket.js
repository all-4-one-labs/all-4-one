import listeners from './game/listeners';
import store from './store.js';
const socket = io('/');

export const initializeSocket = () => {
  console.log('I have connected to the server');
  socket.on('connect', () => { listeners(socket); });
};

export const emitClient = () => {
  setInterval(() => {
      let state = store.getState();
      socket.emit('send_all_data', state);
    }, 1000/30);
}

export default socket;