import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

import { AppThunk, RootState } from '@/app/store';
import { AuthData } from '@/types/AuthData';
import { fetchProfileData } from '../profile/profileSlice';

type LoginBodyType = { username: string; password: string };

type AuthState = {
  authData: AuthData | null;
  fetchAuthDataState: { isLoading: boolean; error: SerializedError | null };
  postLoginState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: AuthState = {
  authData: null,
  fetchAuthDataState: { isLoading: false, error: null },
  postLoginState: { isLoading: false, error: null },
};

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async (_, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch('/auth/login', {
      method: 'GET',
      mode: 'cors',
      headers: { authorization: `Bearer ${token}` },
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const postLogin = createAsyncThunk(
  'auth/postLogin',
  async (loginBody: LoginBodyType, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(loginBody),
    });

    if (!responseState.ok) return rejectWithValue(data);

    storage.setToken(data.token);

    return data.token;
  }
);

export const initAuth = (): AppThunk => (dispatch) => {
  const token = storage.getToken();

  if (token) {
    dispatch(fetchAuthData());
    dispatch(fetchProfileData());
  }
};

export const logout = (): AppThunk => () => {
  storage.clearToken();
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
      .addCase(postLogin.fulfilled, (state) => {
        state.fetchAuthDataState.isLoading = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.fetchAuthDataState.isLoading = false;
        state.fetchAuthDataState.error = action.error;
      });
  },
});

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.authData?.sub;

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectLoginState = (state: RootState) => state.auth.fetchAuthDataState;

export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.authData);
