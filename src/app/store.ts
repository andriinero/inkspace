import { configureStore } from '@reduxjs/toolkit';

import postListReducer from '@/features/postList/postListSlice';
import miscListReducer from '@/features/miscList/miscListSlice';
import singlePagePostReducer from '@/features/singlePagePost/singlePagePostSlice';
import authReducer from '@/features/auth/authSlice';
import createPostReducer from '@/features/createPost/createPostSlice';
import commentListReducer from '@/features/commentList/commentListSlice';
import commentEditorReducer from '@/features/commentEditor/commentEditorSlice';

export const store = configureStore({
  reducer: {
    postList: postListReducer,
    miscList: miscListReducer,
    singlePagePost: singlePagePostReducer,
    auth: authReducer,
    createPost: createPostReducer,
    comments: commentListReducer,
    commentEditor: commentEditorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
