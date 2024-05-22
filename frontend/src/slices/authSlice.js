import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userName: '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    resetToken(state, action) {
      state.token = null;
    },

    setUserName(state, action) {
      state.userName = action.payload;
    },

    resetUserName(state, action) {
      state.userName = '';
    }
  }
})

export const { setToken, resetToken, setUserName, resetUserName } = authSlice.actions;

export default authSlice.reducer;
