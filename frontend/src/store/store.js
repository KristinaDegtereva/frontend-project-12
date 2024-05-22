import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice';
import channelsReducer from '../slices/channelSlice';
import messagesReducer from '../slices/messagesSlice';

export default configureStore({
  reducer: {
    user: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  }
})
