import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: []
  },
  reducers: {
    setMessages(state, action) {
      action.payload.map((el) => state.messages.push(el))
    },
  }
})

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
