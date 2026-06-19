import { createSlice } from '@reduxjs/toolkit';
import { tokenStorage } from '../../lib/tokenStorage';

const initialState = {
  user: null,
  isAuthenticated: Boolean(tokenStorage.getAccessToken()),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      tokenStorage.setTokens(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      tokenStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

