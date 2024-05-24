import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    setChannels(state, action) {
      return {
        ...state,
        channels: action.payload,
      };
    },
    addChanel(state, action) {
      return {
        ...state,
        channels: [...state.channels, action.payload],
      };
    },
  },
});

export const { setChannels, addChanel } = channelsSlice.actions;

export default channelsSlice.reducer;
