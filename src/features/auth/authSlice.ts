import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppFetch } from "@/lib/useAppFetch";

import storage from "@/lib/storage";
import {
  PostLogin,
  PostLoginSchema,
} from "@/types/fetchResponse/success/PostLogin";
import {
  AuthData,
  AuthDataSchema,
} from "@/types/entityData/AuthenticationData";

import { AppThunk, RootState } from "@/app/store";
import { fetchProfileData } from "../profile/profileSlice";
import { ErrorData } from "@/types/fetchResponse/error/ErrorData";
import { TLoginSchema } from "@/types/formSchemas/LoginSchema";
import {
  PostSignUp,
  PostSignUpSchema,
} from "@/types/fetchResponse/success/PostSignUp";
import { TSignUpSchema } from "@/types/formSchemas/SignUpSchema";
import { addNotification } from "../pushNotification/pushNotificationSlice";
import { PushNotificationType } from "@/types/entityData/StatusNotificationData";

type AuthState = {
  authData: AuthData | null;
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  fetchAuthDataState: { isLoading: boolean; error: ErrorData | null };
  postLoginState: { isLoading: boolean; error: ErrorData | null };
  postSignUpState: { isLoading: boolean; error: ErrorData | null };
};

const initialState: AuthState = {
  authData: null,
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  fetchAuthDataState: { isLoading: true, error: null },
  postLoginState: { isLoading: false, error: null },
  postSignUpState: { isLoading: false, error: null },
};

export const fetchAuthData = createAsyncThunk<
  AuthData,
  void,
  { rejectValue: ErrorData }
>("auth/fetchAuthData", async (_, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch("/auth/login", {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = AuthDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as AuthData;
});

export const postLogin = createAsyncThunk<
  PostLogin,
  TLoginSchema,
  { rejectValue: ErrorData }
>("auth/postLogin", async (loginBody, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(loginBody),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = PostLoginSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  storage.setToken((data as PostLogin).token);

  return data as PostLogin;
});

export const postSignUp = createAsyncThunk<
  PostSignUp,
  TSignUpSchema,
  { rejectValue: ErrorData }
>("auth/postSignUp", async (signUpBody, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch("/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(signUpBody),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = PostSignUpSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostSignUp;
});

export const initAuth = (): AppThunk => (dispatch) => {
  try {
    const token = storage.getToken();

    if (token) {
      dispatch(fetchAuthData());
      dispatch(fetchProfileData());
    } else {
      dispatch(resetLoadingState());
    }
  } catch (err) {
    dispatch(
      addNotification((err as Error).message, PushNotificationType.ERROR),
    );
  }
};

export const logout = (): AppThunk => (dispatch) => {
  storage.clearToken();
  dispatch(clearAuthData());
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginModal(state) {
      state.isLoginModalOpen = true;
    },
    closeLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    openSignUpModal(state) {
      state.isSignUpModalOpen = true;
    },
    closeSignUpModal(state) {
      state.isSignUpModalOpen = false;
    },
    resetLoadingState(state) {
      state.fetchAuthDataState.isLoading = false;
    },
    clearAuthData(state) {
      state.authData = null;
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
        state.fetchAuthDataState.error =
          action.payload || (action.error as ErrorData);
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
        state.postLoginState.error =
          action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(postSignUp.pending, (state) => {
        state.postSignUpState.isLoading = true;
        state.postSignUpState.error = null;
      })
      .addCase(postSignUp.fulfilled, (state) => {
        state.postSignUpState.isLoading = false;
        state.isSignUpModalOpen = false;
        state.isLoginModalOpen = true;
      })
      .addCase(postSignUp.rejected, (state, action) => {
        state.postSignUpState.isLoading = false;
        state.postSignUpState.error =
          action.payload || (action.error as ErrorData);
      });
  },
});

const { resetLoadingState, clearAuthData } = authSlice.actions;

export const {
  openSignUpModal,
  closeSignUpModal,
  openLoginModal,
  closeLoginModal,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) =>
  state.auth.authData?.sub;

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectFetchAuthDataState = (state: RootState) =>
  state.auth.fetchAuthDataState;

export const selectPostLoginState = (state: RootState) =>
  state.auth.postLoginState;

export const selectPostSignUpState = (state: RootState) =>
  state.auth.postSignUpState;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.authData);

export const selectIsLoginModalOpen = (state: RootState) =>
  state.auth.isLoginModalOpen;

export const selectIsSignUpModalOpen = (state: RootState) =>
  state.auth.isSignUpModalOpen;
