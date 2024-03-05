import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import { RootState } from '@/app/store';
import { UserData } from '@/types/UserData';

type ProfileState = {
  profileData: UserData | null;
  fetchProfileDataState: { isLoading: boolean; error: SerializedError | null };
  postBookmarkState: { isLoading: boolean; error: SerializedError | null };
  deleteBookmarkState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: ProfileState = {
  profileData: null,
  fetchProfileDataState: { isLoading: false, error: null },
  postBookmarkState: { isLoading: false, error: null },
  deleteBookmarkState: { isLoading: false, error: null },
};

export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

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

export const postBookmark = createAsyncThunk(
  'profile/postBookmark',
  async (postId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

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
  async (postId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

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
  },
});

export default profileSlice.reducer;

export const selectFetchProfileDataState = (state: RootState) =>
  state.profile.fetchProfileDataState;

export const selectPostBookmarkState = (state: RootState) =>
  state.profile.postBookmarkState;

export const selectDeleteBookmarkState = (state: RootState) =>
  state.profile.deleteBookmarkState;

export const selectProfileData = (state: RootState) => state.profile.profileData;

export const selectProfileBookmarks = (state: RootState) =>
  state.profile.profileData?.post_bookmarks;
