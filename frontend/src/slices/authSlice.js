import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userName: '',
  },
  reducers: {
    setToken(state, action) {
      return {
        ...state,
        token: action.payload,
      };
    },

    resetToken(state) {
      return {
        ...state,
        token: null,
      };
    },

    setUserName(state, action) {
      return {
        ...state,
        userName: action.payload,
      };
    },

    resetUserName(state) {
      return {
        ...state,
        userName: '',
      };
    },
  },
});

export const {
  setToken, resetToken, setUserName, resetUserName,
} = authSlice.actions;

export default authSlice.reducer;
