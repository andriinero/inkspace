import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import postListReducer from '@/features/postList/postListSlice';
import miscListReducer from '@/features/miscList/miscListSlice';
import singlePagePostReducer from '@/features/singlePagePost/singlePagePostSlice';
import authReducer from '@/features/auth/authSlice';
import postFormReducer from '@/features/postForm/postFormSlice';
import commentListReducer from '@/features/commentList/commentListSlice';
import commentEditorReducer from '@/features/commentEditor/commentEditorSlice';
import profileReducer from '@/features/profile/profileSlice';
import authorPageReducer from '@/features/authorPage/authorPageSlice';
import appImagesReducer from '@/features/appImages/appImagesSlice';
import profileEditReducer from '@/features/profileEdit/profileEditSlice';

export const store = configureStore({
  reducer: {
    postList: postListReducer,
    miscList: miscListReducer,
    singlePagePost: singlePagePostReducer,
    auth: authReducer,
    postForm: postFormReducer,
    commentList: commentListReducer,
    commentEditor: commentEditorReducer,
    profile: profileReducer,
    authorPage: authorPageReducer,
    appImages: appImagesReducer,
    profileEdit: profileEditReducer,
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
