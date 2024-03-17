import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

import { RootState } from '@/app/store';
import { ProfileData } from '@/types/ProfileData';
import PostData from '@/types/PostData';

type ProfileState = {
  profileData: ProfileData | null;
  profileBookmarkList: PostData[];
  fetchProfileDataState: { isLoading: boolean; error: SerializedError | null };
  fetchProfileBookmarksState: { isLoading: boolean; error: SerializedError | null };
  bookmarkActionState: { isLoading: boolean; error: SerializedError | null };
  followActionState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: ProfileState = {
  profileData: null,
  profileBookmarkList: [],
  fetchProfileBookmarksState: { isLoading: true, error: null },
  fetchProfileDataState: { isLoading: true, error: null },
  bookmarkActionState: { isLoading: false, error: null },
  followActionState: { isLoading: false, error: null },
};

export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (_, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch('/api/profile', {
      method: 'GET',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const fetchProfileBookmarks = createAsyncThunk(
  'profile/fetchProfileBookmarks',
  async (_, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch('/api/profile/bookmarks', {
      method: 'GET',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const postBookmark = createAsyncThunk(
  'profile/postBookmark',
  async (postId: string, { rejectWithValue }) => {
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

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const deleteBookmark = createAsyncThunk(
  'profile/deleteBookmark',
  async (postId: string, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch(
      `/api/profile/bookmarks/${postId}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const postFollowUser = createAsyncThunk(
  'profile/postFollowUser',
  async (userId: string, { rejectWithValue }) => {
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

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const deleteFollowUser = createAsyncThunk(
  'profile/deleteFollowUser',
  async (userId: string, { rejectWithValue }) => {
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

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
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
        state.fetchProfileDataState.error = action.error;
      });
    builder
      .addCase(fetchProfileBookmarks.pending, (state) => {
        state.fetchProfileBookmarksState.isLoading = true;
        state.fetchProfileBookmarksState.error = null;
      })
      .addCase(fetchProfileBookmarks.fulfilled, (state, action) => {
        state.profileBookmarkList = action.payload.post_bookmarks;
        state.fetchProfileBookmarksState.isLoading = false;
      })
      .addCase(fetchProfileBookmarks.rejected, (state, action) => {
        state.fetchProfileBookmarksState.isLoading = false;
        state.fetchProfileBookmarksState.error = action.error;
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
        state.bookmarkActionState.error = action.error;
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
        state.bookmarkActionState.error = action.error;
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
        state.followActionState.error = action.error;
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
        state.followActionState.error = action.error;
      });
  },
});

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
