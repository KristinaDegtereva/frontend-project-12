import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: []
  },
  reducers: {
    setChannels(state, action) {
      action.payload.map((el) => state.channels.push(el))
    },
  }
})

export const { setChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
