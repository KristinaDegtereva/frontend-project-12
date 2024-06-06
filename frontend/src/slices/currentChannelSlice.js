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

export const getCurrentChannel = (state) => state.currentChannel.currentChannel;

export default currentChannelSlice.reducer;
