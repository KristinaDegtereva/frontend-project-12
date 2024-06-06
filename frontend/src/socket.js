import { io } from 'socket.io-client';
import store from './store/store';
import { setMessages } from './slices/messagesSlice';
import { addChanel } from './slices/channelSlice';

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(setMessages(payload));
});

socket.on('newChannel', (payload) => {
  store.dispatch(addChanel(payload));
});

export default socket;
