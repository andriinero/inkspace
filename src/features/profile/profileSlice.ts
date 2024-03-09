import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

import { RootState } from '@/app/store';
import { UserData } from '@/types/UserData';
import Post from '@/types/Post';

type ProfileState = {
  profileData: UserData | null;
  profileBookmarkList: Post[];
  fetchProfileDataState: { isLoading: boolean; error: SerializedError | null };
  fetchProfileBookmarksState: { isLoading: boolean; error: SerializedError | null };
  postBookmarkState: { isLoading: boolean; error: SerializedError | null };
  deleteBookmarkState: { isLoading: boolean; error: SerializedError | null };
  postFollowedUserState: { isLoading: boolean; error: SerializedError | null };
  deleteFollowUserState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: ProfileState = {
  profileData: null,
  profileBookmarkList: [],
  fetchProfileBookmarksState: { isLoading: true, error: null },
  fetchProfileDataState: { isLoading: true, error: null },
  postBookmarkState: { isLoading: true, error: null },
  deleteBookmarkState: { isLoading: true, error: null },
  postFollowedUserState: { isLoading: true, error: null },
  deleteFollowUserState: { isLoading: true, error: null },
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
      .addCase(postBookmark.pending, (state) => {
        state.postBookmarkState.isLoading = true;
        state.postBookmarkState.error = null;
      })
      .addCase(postBookmark.fulfilled, (state, action) => {
        if (state.profileData) state.profileData.post_bookmarks.push(action.payload._id);
        state.postBookmarkState.isLoading = false;
      })
      .addCase(postBookmark.rejected, (state, action) => {
        state.postBookmarkState.isLoading = false;
        state.postBookmarkState.error = action.error;
      });
    builder
      .addCase(deleteBookmark.pending, (state) => {
        state.deleteBookmarkState.isLoading = true;
        state.deleteBookmarkState.error = null;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        if (state.profileData)
          state.profileData.post_bookmarks = state.profileData.post_bookmarks.filter(
            (id) => id !== action.payload._id
          );
        state.deleteBookmarkState.isLoading = false;
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.deleteBookmarkState.isLoading = false;
        state.deleteBookmarkState.error = action.error;
      });
    builder
      .addCase(postFollowUser.pending, (state) => {
        state.postFollowedUserState.isLoading = true;
        state.postFollowedUserState.error = null;
      })
      .addCase(postFollowUser.fulfilled, (state, action) => {
        if (state.profileData) state.profileData.followed_users.push(action.payload._id);
        state.postFollowedUserState.isLoading = false;
      })
      .addCase(postFollowUser.rejected, (state, action) => {
        state.postFollowedUserState.isLoading = false;
        state.postFollowedUserState.error = action.error;
      });
    builder
      .addCase(deleteFollowUser.pending, (state) => {
        state.deleteFollowUserState.isLoading = true;
        state.deleteFollowUserState.error = null;
      })
      .addCase(deleteFollowUser.fulfilled, (state, action) => {
        if (state.profileData)
          state.profileData.followed_users = state.profileData.followed_users.filter(
            (id) => id !== action.payload._id
          );
        state.deleteFollowUserState.isLoading = false;
      })
      .addCase(deleteFollowUser.rejected, (state, action) => {
        state.deleteFollowUserState.isLoading = false;
        state.deleteFollowUserState.error = action.error;
      });
  },
});

export default profileSlice.reducer;

export const selectFetchProfileDataState = (state: RootState) =>
  state.profile.fetchProfileDataState;

export const selectFetchProfileBookmarksState = (state: RootState) =>
  state.profile.fetchProfileBookmarksState;

export const selectPostBookmarkState = (state: RootState) =>
  state.profile.postBookmarkState;

export const selectDeleteBookmarkState = (state: RootState) =>
  state.profile.deleteBookmarkState;

export const selectProfileData = (state: RootState) => state.profile.profileData;

export const selectProfileBookmarksList = (state: RootState) =>
  state.profile.profileBookmarkList;

// TODO: refactor
export const selectProfileBookmarks = (state: RootState) =>
  state.profile.profileData?.post_bookmarks;

export const selectProfileFollowedUsers = (state: RootState) =>
  state.profile.profileData?.followed_users;
