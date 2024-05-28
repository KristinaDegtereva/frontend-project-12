import { io } from 'socket.io-client';

const setupSocket = (event, callback) => {
  const socket = io();
  socket.on(event, (payload) => {
    callback(payload);
  });
};

export default setupSocket;
