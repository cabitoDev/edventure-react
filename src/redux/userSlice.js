import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userInfo: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;