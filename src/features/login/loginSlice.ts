import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

type LoginState = {
  isModalOpen: boolean;
};

const initialState: LoginState = {
  isModalOpen: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    openLoginModal(state) {
      state.isModalOpen = true;
    },
    closeLoginModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = loginSlice.actions;

export default loginSlice.reducer;

export const selectIsLoginModalOpen = (state: RootState) => state.login.isModalOpen;
