import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice';
import channelsReducer from '../slices/channelSlice';
import messagesReducer from '../slices/messagesSlice';
import currentChannelReducer from '../slices/currentChannelSlice';

export default configureStore({
  reducer: {
    user: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannel: currentChannelReducer,
  }
})
