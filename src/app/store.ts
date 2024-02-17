import { configureStore } from '@reduxjs/toolkit';
import postListReducer from '@/features/postList/postListSlice';
import miscListReducer from '@/features/misc/miscListSlice';

export const store = configureStore({
  reducer: {
    postList: postListReducer,
    miscList: miscListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
