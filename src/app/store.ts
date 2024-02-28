import { configureStore } from '@reduxjs/toolkit';
import postListReducer from '@/features/postList/postListSlice';
import miscListReducer from '@/features/miscList/miscListSlice';
import singlePagePostReducer from '@/features/singlePagePost/singlePagePostSlice';
import authReducer from '@/features/auth/authSlice';
import createPostReducer from '@/features/createPost/createPostSlice';

export const store = configureStore({
  reducer: {
    postList: postListReducer,
    miscList: miscListReducer,
    singlePagePost: singlePagePostReducer,
    auth: authReducer,
    createPost: createPostReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
