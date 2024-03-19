import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import postListReducer from '@/features/postList/postListSlice';
import miscListReducer from '@/features/miscList/miscListSlice';
import singlePagePostReducer from '@/features/singlePagePost/singlePagePostSlice';
import authReducer from '@/features/auth/authSlice';
import createPostReducer from '@/features/createPost/createPostSlice';
import commentListReducer from '@/features/commentList/commentListSlice';
import commentEditorReducer from '@/features/commentEditor/commentEditorSlice';
import profileReducer from '@/features/profile/profileSlice';
import authorPageReducer from '@/features/authorPage/authorPageSlice';
import appImagesReducer from '@/features/appImages/appImagesSlice';
import loginReducer from '@/features/login/loginSlice';

export const store = configureStore({
  reducer: {
    postList: postListReducer,
    miscList: miscListReducer,
    singlePagePost: singlePagePostReducer,
    auth: authReducer,
    createPost: createPostReducer,
    commentList: commentListReducer,
    commentEditor: commentEditorReducer,
    profile: profileReducer,
    authorPage: authorPageReducer,
    appImages: appImagesReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
