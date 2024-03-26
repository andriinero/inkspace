import { z } from 'zod';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/lib/storage';

import { RootState } from '@/app/store';
import { ProfileData, ProfileDataSchema } from '@/types/entityData/ProfileData';
import { PostData, PostDataSchema } from '@/types/entityData/PostData';
import {
  TargetObjectId,
  TargetObjectIdSchema,
} from '@/types/fetchResponse/success/TargetObjectId';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

type ProfileState = {
  profileData: ProfileData | null;
  profileBookmarkList: PostData[];
  fetchProfileDataState: { isLoading: boolean; error: ErrorData | null };
  fetchProfileBookmarksState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
  bookmarkActionState: { isLoading: boolean; error: ErrorData | null };
  followActionState: { isLoading: boolean; error: ErrorData | null };
};

const initialState: ProfileState = {
  profileData: null,
  profileBookmarkList: [],
  fetchProfileBookmarksState: { isLoading: true, error: null },
  fetchProfileDataState: { isLoading: true, error: null },
  bookmarkActionState: { isLoading: false, error: null },
  followActionState: { isLoading: false, error: null },
};

export const fetchProfileData = createAsyncThunk<
  ProfileData,
  void,
  { rejectValue: ErrorData }
>('profile/fetchProfileData', async (_, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile', {
    method: 'GET',
    mode: 'cors',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = ProfileDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as ProfileData;
});

export const fetchProfileBookmarks = createAsyncThunk<
  PostData[],
  void,
  { rejectValue: ErrorData }
>('profile/fetchProfileBookmarks', async (_, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile/bookmarks', {
    method: 'GET',
    mode: 'cors',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!responseState.ok) return rejectWithValue(data as ErrorData);

  const validationResult = z.array(PostDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostData[];
});

export const postBookmark = createAsyncThunk<
  TargetObjectId,
  string,
  { rejectValue: ErrorData }
>('profile/postBookmark', async (postId, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile/bookmarks', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postid: postId }),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = TargetObjectIdSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as TargetObjectId;
});

export const deleteBookmark = createAsyncThunk<
  TargetObjectId,
  string,
  { rejectValue: ErrorData }
>('profile/deleteBookmark', async (postId, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch(`/api/profile/bookmarks/${postId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = TargetObjectIdSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as TargetObjectId;
});

export const postFollowUser = createAsyncThunk<
  TargetObjectId,
  string,
  { rejectValue: ErrorData }
>('profile/postFollowUser', async (userId, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile/followed-users', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userid: userId }),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = TargetObjectIdSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as TargetObjectId;
});

export const deleteFollowUser = createAsyncThunk<
  TargetObjectId,
  string,
  { rejectValue: ErrorData }
>('profile/deleteFollowUser', async (userId, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch(
    `/api/profile/followed-users/${userId}`,
    {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = TargetObjectIdSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as TargetObjectId;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateImageId(state, action) {
      state.profileData!.profile_image = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.fetchProfileDataState.isLoading = true;
        state.fetchProfileDataState.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.profileData = action.payload;
        state.fetchProfileDataState.isLoading = false;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.fetchProfileDataState.isLoading = false;
        state.fetchProfileDataState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(fetchProfileBookmarks.pending, (state) => {
        state.fetchProfileBookmarksState.isLoading = true;
        state.fetchProfileBookmarksState.error = null;
      })
      .addCase(fetchProfileBookmarks.fulfilled, (state, action) => {
        state.profileBookmarkList = action.payload;
        state.fetchProfileBookmarksState.isLoading = false;
      })
      .addCase(fetchProfileBookmarks.rejected, (state, action) => {
        state.fetchProfileBookmarksState.isLoading = false;
        state.fetchProfileDataState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(postBookmark.pending, (state, action) => {
        if (state.profileData) state.profileData.post_bookmarks.push(action.meta.arg);
        state.bookmarkActionState.isLoading = true;
        state.bookmarkActionState.error = null;
      })
      .addCase(postBookmark.fulfilled, (state) => {
        state.bookmarkActionState.isLoading = false;
      })
      .addCase(postBookmark.rejected, (state, action) => {
        if (state.profileData)
          state.profileData.post_bookmarks = state.profileData.post_bookmarks.filter(
            (id) => id !== action.meta.arg
          );
        state.bookmarkActionState.isLoading = false;
        state.fetchProfileDataState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(deleteBookmark.pending, (state, action) => {
        if (state.profileData)
          state.profileData.post_bookmarks = state.profileData.post_bookmarks.filter(
            (id) => id !== action.meta.arg
          );
        state.bookmarkActionState.isLoading = true;
        state.bookmarkActionState.error = null;
      })
      .addCase(deleteBookmark.fulfilled, (state) => {
        state.bookmarkActionState.isLoading = false;
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        if (state.profileData) state.profileData.post_bookmarks.push(action.meta.arg);
        state.bookmarkActionState.isLoading = false;
        state.fetchProfileDataState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(postFollowUser.pending, (state, action) => {
        if (state.profileData) state.profileData.followed_users.push(action.meta.arg);
        state.followActionState.isLoading = true;
        state.followActionState.error = null;
      })
      .addCase(postFollowUser.fulfilled, (state) => {
        state.followActionState.isLoading = false;
      })
      .addCase(postFollowUser.rejected, (state, action) => {
        if (state.profileData)
          state.profileData.followed_users = state.profileData.followed_users.filter(
            (id) => id !== action.meta.arg
          );
        state.followActionState.isLoading = false;
        state.fetchProfileDataState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(deleteFollowUser.pending, (state, action) => {
        if (state.profileData)
          state.profileData.followed_users = state.profileData.followed_users.filter(
            (id) => id !== action.meta.arg
          );
        state.followActionState.isLoading = true;
        state.followActionState.error = null;
      })
      .addCase(deleteFollowUser.fulfilled, (state) => {
        state.followActionState.isLoading = false;
      })
      .addCase(deleteFollowUser.rejected, (state, action) => {
        if (state.profileData) state.profileData.followed_users.push(action.meta.arg);
        state.followActionState.isLoading = false;
        state.fetchProfileDataState.error = action.payload || (action.error as ErrorData);
      });
  },
});

export const { updateImageId } = profileSlice.actions;

export default profileSlice.reducer;

export const selectFetchProfileDataState = (state: RootState) =>
  state.profile.fetchProfileDataState;

export const selectFetchProfileBookmarksState = (state: RootState) =>
  state.profile.fetchProfileBookmarksState;

export const selectBookmarkActionState = (state: RootState) =>
  state.profile.bookmarkActionState;

export const selectFollowActionState = (state: RootState) =>
  state.profile.followActionState;

export const selectProfileData = (state: RootState) => state.profile.profileData;

export const selectProfileId = (state: RootState) => state.profile.profileData?._id;

export const selectProfileImageId = (state: RootState) =>
  state.profile.profileData?.profile_image;

export const selectProfileBookmarksList = (state: RootState) =>
  state.profile.profileBookmarkList;

export const selectProfileBookmarks = (state: RootState) =>
  state.profile.profileData?.post_bookmarks;

export const selectProfileFollowedUsers = (state: RootState) =>
  state.profile.profileData?.followed_users;
