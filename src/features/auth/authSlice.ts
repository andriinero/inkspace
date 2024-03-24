import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/lib/storage';
import { PostLogin, PostLoginSchema } from '@/types/fetchResponse/success/PostLogin';
import { AuthData, AuthDataSchema } from '@/types/entityData/AuthenticationData';

import { AppThunk, RootState } from '@/app/store';
import { fetchProfileData } from '../profile/profileSlice';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

type LoginBodyType = { username: string; password: string };

type AuthState = {
  authData: AuthData | null;
  isModalOpen: boolean;
  fetchAuthDataState: { isLoading: boolean; error: SerializedError | null };
  postLoginState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: AuthState = {
  authData: null,
  isModalOpen: false,
  fetchAuthDataState: { isLoading: true, error: null },
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

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = AuthDataSchema.safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as AuthData;
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

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = PostLoginSchema.safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    storage.setToken((data as PostLogin).token);

    return data as PostLogin;
  }
);

export const initAuth = (): AppThunk => (dispatch) => {
  const token = storage.getToken();

  if (token) {
    dispatch(fetchAuthData());
    dispatch(fetchProfileData());
  } else {
    dispatch(resetLoadingState());
  }
};

export const logout = (): AppThunk => () => {
  storage.clearToken();
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoadingState(state) {
      state.fetchAuthDataState.isLoading = false;
    },
    openLoginModal(state) {
      state.isModalOpen = true;
    },
    closeLoginModal(state) {
      state.isModalOpen = false;
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
        state.postLoginState.isLoading = true;
        state.postLoginState.error = null;
      })
      .addCase(postLogin.fulfilled, (state) => {
        state.postLoginState.isLoading = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.postLoginState.isLoading = false;
        state.postLoginState.error = action.error;
      });
  },
});

const { resetLoadingState } = authSlice.actions;

export const { openLoginModal, closeLoginModal } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.authData?.sub;

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectFetchAuthDataState = (state: RootState) =>
  state.auth.fetchAuthDataState;

export const selectPostLoginState = (state: RootState) => state.auth.postLoginState;

export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.authData);

export const selectIsLoginModalOpen = (state: RootState) => state.auth.isModalOpen;
