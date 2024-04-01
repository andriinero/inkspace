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
import {
  GeneralAuthorData,
  GeneralAuthorDataSchema,
} from '@/types/entityData/GeneralAuthorData';

type ProfileState = {
  profileData: ProfileData | null;
  profileBookmarkList: PostData[];
  profilePostsList: PostData[];
  profileIgnoredUsersList: GeneralAuthorData[];
  fetchProfileDataState: { isLoading: boolean; error: ErrorData | null };
  fetchProfileBookmarksState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
  fetchProfilePostsState: { isLoading: boolean; error: ErrorData | null };
  bookmarkActionState: { isLoading: boolean; error: ErrorData | null };
  followActionState: { isLoading: boolean; error: ErrorData | null };
  fetchIgnoredUsersState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
  ignoreUserActionState: { isLoading: boolean; error: ErrorData | null };
};

const initialState: ProfileState = {
  profileData: null,
  profileBookmarkList: [],
  profilePostsList: [],
  profileIgnoredUsersList: [],
  fetchProfileBookmarksState: { isLoading: true, error: null },
  fetchProfilePostsState: { isLoading: true, error: null },
  fetchProfileDataState: { isLoading: true, error: null },
  bookmarkActionState: { isLoading: false, error: null },
  followActionState: { isLoading: false, error: null },
  fetchIgnoredUsersState: { isLoading: true, error: null },
  ignoreUserActionState: { isLoading: false, error: null },
};

// PROFILE DATA //

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

// BOOKMARKS //

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

// RECENT POSTS //

export const fetchProfilePosts = createAsyncThunk<
  PostData[],
  void,
  { rejectValue: ErrorData; state: RootState }
>('profile/fetchProfilePosts', async (_, { getState, rejectWithValue }) => {
  const currentUserId = getState().auth.authData?.sub;

  const { data, responseState } = await useAppFetch(
    `/api/posts?userid=${currentUserId}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = z.array(PostDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostData[];
});

// FOLLOWED USERS //

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

// IGNORED USERS //

export const fetchIgnoredUsers = createAsyncThunk<
  GeneralAuthorData[],
  void,
  { rejectValue: ErrorData }
>('profile/fetchIgnoredUsers', async (_, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile/ignored-users', {
    method: 'GET',
    mode: 'cors',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!responseState.ok) return rejectWithValue(data as ErrorData);

  const validationResult = z.array(GeneralAuthorDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as GeneralAuthorData[];
});

export const postIgnoredUser = createAsyncThunk<
  TargetObjectId,
  string,
  { rejectValue: ErrorData }
>('profile/postIgnoredUser', async (userId, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile/ignored-users', {
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

export const deleteIgnoredUser = createAsyncThunk<
  TargetObjectId,
  string,
  { rejectValue: ErrorData }
>('profile/deleteIgnoredUser', async (userId, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch(
    `/api/profile/ignored-users/${userId}`,
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
    // PROFILE DATA //

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

    // BOOKMARKS //

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
        state.fetchProfileBookmarksState.error =
          action.payload || (action.error as ErrorData);
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
        state.bookmarkActionState.error = action.payload || (action.error as ErrorData);
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
        state.bookmarkActionState.error = action.payload || (action.error as ErrorData);
      });

    // RECENT POSTS //

    builder
      .addCase(fetchProfilePosts.pending, (state) => {
        state.fetchProfilePostsState.isLoading = true;
        state.fetchProfilePostsState.error = null;
      })
      .addCase(fetchProfilePosts.fulfilled, (state, action) => {
        state.profilePostsList = action.payload;
        state.fetchProfilePostsState.isLoading = false;
      })
      .addCase(fetchProfilePosts.rejected, (state, action) => {
        state.fetchProfilePostsState.isLoading = false;
        state.fetchProfilePostsState.error =
          action.payload || (action.error as ErrorData);
      });

    // FOLLOWED USERS //

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
        state.followActionState.error = action.payload || (action.error as ErrorData);
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
        state.followActionState.error = action.payload || (action.error as ErrorData);
      });

    // IGNORED USERS //

    builder
      .addCase(fetchIgnoredUsers.pending, (state) => {
        state.fetchIgnoredUsersState.isLoading = true;
        state.fetchIgnoredUsersState.error = null;
      })
      .addCase(fetchIgnoredUsers.fulfilled, (state, action) => {
        state.profileIgnoredUsersList = action.payload;
        state.fetchIgnoredUsersState.isLoading = false;
      })
      .addCase(fetchIgnoredUsers.rejected, (state, action) => {
        state.fetchIgnoredUsersState.isLoading = false;
        state.fetchIgnoredUsersState.error =
          action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(postIgnoredUser.pending, (state, action) => {
        if (state.profileData) state.profileData.ignored_users.push(action.meta.arg);
        state.ignoreUserActionState.isLoading = true;
        state.ignoreUserActionState.error = null;
      })
      .addCase(postIgnoredUser.fulfilled, (state) => {
        state.ignoreUserActionState.isLoading = false;
      })
      .addCase(postIgnoredUser.rejected, (state, action) => {
        if (state.profileData)
          state.profileData.ignored_users = state.profileData.ignored_users.filter(
            (id) => id !== action.meta.arg
          );
        state.ignoreUserActionState.isLoading = false;
        state.ignoreUserActionState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(deleteIgnoredUser.pending, (state, action) => {
        if (state.profileData)
          state.profileData.ignored_users = state.profileData.ignored_users.filter(
            (id) => id !== action.meta.arg
          );
        state.ignoreUserActionState.isLoading = true;
        state.ignoreUserActionState.error = null;
      })
      .addCase(deleteIgnoredUser.fulfilled, (state) => {
        state.ignoreUserActionState.isLoading = false;
      })
      .addCase(deleteIgnoredUser.rejected, (state, action) => {
        if (state.profileData) state.profileData.ignored_users.push(action.meta.arg);
        state.ignoreUserActionState.isLoading = false;
        state.ignoreUserActionState.error = action.payload || (action.error as ErrorData);
      });
  },
});

export const { updateImageId } = profileSlice.actions;

export default profileSlice.reducer;

// PROFILE DATA //

export const selectFetchProfileDataState = (state: RootState) =>
  state.profile.fetchProfileDataState;

export const selectProfileData = (state: RootState) => state.profile.profileData;

export const selectProfileId = (state: RootState) => state.profile.profileData?._id;

export const selectProfileImageId = (state: RootState) =>
  state.profile.profileData?.profile_image;

// BOOKMARKS //

export const selectFetchProfileBookmarksState = (state: RootState) =>
  state.profile.fetchProfileBookmarksState;

export const selectBookmarkActionState = (state: RootState) =>
  state.profile.bookmarkActionState;

export const selectProfileBookmarksList = (state: RootState) =>
  state.profile.profileBookmarkList;

export const selectProfileBookmarks = (state: RootState) =>
  state.profile.profileData?.post_bookmarks;

export const selectIsPostBookmarked = (postId: string) => (state: RootState) =>
  state.profile.profileData?.post_bookmarks.some((p) => p === postId);

// RECENT POSTS //

export const selectFetchProfilePostsState = (state: RootState) =>
  state.profile.fetchProfilePostsState;

export const selectProfilePostsList = (state: RootState) =>
  state.profile.profilePostsList;

// FOLLOWED USERS //

export const selectFollowActionState = (state: RootState) =>
  state.profile.followActionState;

export const selectProfileFollowedUsers = (state: RootState) =>
  state.profile.profileData?.followed_users;

export const selectIsUserFollowed = (userId: string) => (state: RootState) =>
  state.profile.profileData?.followed_users.some((u) => u === userId);

// IGNORED USERS //

export const selectIgnoreUserActionState = (state: RootState) =>
  state.profile.ignoreUserActionState;

export const selectProfileIgnoredUsers = (state: RootState) =>
  state.profile.profileData?.ignored_users;

export const selectIsUserIgnored = (userId: string) => (state: RootState) =>
  state.profile.profileData?.ignored_users.some((u) => u === userId);
