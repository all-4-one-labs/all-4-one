import listeners from './game/engine/listeners';
const socket = io('/');

export const initializeSocket = () => {
  console.log('I have connected to the server');
  socket.on('connect', () => { listeners(socket); });
};

export default socket;
