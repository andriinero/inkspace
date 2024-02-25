import { RootState } from '@/app/store';
import { User } from '@/types/User';
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type authState = {
  authData: User | null;
  token: string | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: authState = {
  authData: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  error: null,
};

export const fetchAuthData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { getState }) => {
    const { auth } = getState() as { auth: authState };

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'GET',
      headers: { authorization: `Bearer ${auth.token}` },
      mode: 'cors',
    });
    const authData = await response.json();

    return authData;
  }
);

export const login = createAsyncThunk('auth/login', async (loginBody) => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(loginBody),
  });
  const data = await response.json();

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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder.addCase(fetchAuthData.fulfilled, (state, action) => {
      state.authData = action.payload;
    });
  },
});

export default authSlice.reducer;

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;

export const selectAuthError = (state: RootState) => state.auth.error;
