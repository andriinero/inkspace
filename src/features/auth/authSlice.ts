import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { User } from '@/types/User';

type LoginBodyType = { username: string; password: string };

type AuthState = {
  authData: User | null;
  token: string | null;
  loginState: { isLoading: boolean; error: SerializedError | null };
  signupState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: AuthState = {
  authData: null,
  token: localStorage.getItem('token'),
  loginState: { isLoading: false, error: null },
  signupState: { isLoading: false, error: null },
};

export const fetchAuthData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { getState }) => {
    const { auth } = getState() as { auth: AuthState };

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'GET',
      mode: 'cors',
      headers: { authorization: `Bearer ${auth.token}` },
    });
    const authData = await response.json();

    return authData;
  }
);

export const login = createAsyncThunk('auth/login', async (loginBody: LoginBodyType) => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(loginBody),
  });
  const data = await response.json();

  localStorage.setItem('token', data.token);

  return data.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.authData = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loginState.isLoading = true;
        state.loginState.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginState.isLoading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.error = action.error;
      });
    builder.addCase(fetchAuthData.fulfilled, (state, action) => {
      state.authData = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.authData?.sub;

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectToken = (state: RootState) => state.auth.token;

export const selectLoginState = (state: RootState) => state.auth.loginState;

export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.authData);
