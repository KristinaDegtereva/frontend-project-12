import { createSlice } from '@reduxjs/toolkit';

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: {
    currentChannel: { id: '1', name: 'general', removable: false },
  },
  reducers: {
    setCurrentChannel(state, action) {
      return {
        ...state,
        currentChannel: action.payload,
      };
    },
  },
});

export const { setCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
