import { io } from 'socket.io-client';

const socket = io();

export const subscribeToEvent = (event, callback) => {
  socket.on(event, callback);
};

export const emitEvent = (event, data) => {
  socket.emit(event, data);
};

export const unsubscribeFromEvent = (event) => {
  socket.off(event);
};
