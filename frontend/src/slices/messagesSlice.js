import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, action) {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    removeMessages(state, action) {
      return {
        ...state,
        messages: state.messages.filter(
          (el) => Number(el.channelId) !== Number(action.payload),
        ),
      };
    },
  },
});

export const { setMessages, removeMessages } = messagesSlice.actions;

export const getMessages = (state) => state.messages.messages;

export default messagesSlice.reducer;
