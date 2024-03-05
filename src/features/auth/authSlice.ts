import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '@/app/store';
import { AuthData } from '@/types/AuthData';

type LoginBodyType = { username: string; password: string };

type AuthState = {
  authData: AuthData | null;
  token: string | null;
  fetchAuthDataState: { isLoading: boolean; error: SerializedError | null };
  postLoginState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: AuthState = {
  authData: null,
  token: null,
  fetchAuthDataState: { isLoading: false, error: null },
  postLoginState: { isLoading: false, error: null },
};

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'GET',
      mode: 'cors',
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (!response.ok) return rejectWithValue(data);

    return data;
  }
);

export const postLogin = createAsyncThunk(
  'auth/postLogin',
  async (loginBody: LoginBodyType, { rejectWithValue }) => {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(loginBody),
    });
    const data = await response.json();

    if (!response.ok) return rejectWithValue(data);

    localStorage.setItem('token', data.token);

    return data.token;
  }
);

export const initializeToken = (): AppThunk => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setToken(token));
};

export const logout = (): AppThunk => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(resetToken());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    deleteToken(state) {
      state.authData = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.fetchAuthDataState.isLoading = true;
        state.fetchAuthDataState.error = null;
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.fetchAuthDataState.isLoading = false;
      })
      .addCase(fetchAuthData.rejected, (state, action) => {
        state.fetchAuthDataState.isLoading = false;
        state.fetchAuthDataState.error = action.error;
      });
    builder
      .addCase(postLogin.pending, (state) => {
        state.fetchAuthDataState.isLoading = true;
        state.fetchAuthDataState.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.fetchAuthDataState.isLoading = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.fetchAuthDataState.isLoading = false;
        state.fetchAuthDataState.error = action.error;
      });
  },
});

export const { setToken, deleteToken: resetToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.authData?.sub;

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectToken = (state: RootState) => state.auth.token;

export const selectLoginState = (state: RootState) => state.auth.fetchAuthDataState;

export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.authData);
