import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import { RootState } from '@/app/store';
import Post from '@/types/Post';

type postListState = {
  postList: Post[];
  fetchPostsState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
};

const initialState: postListState = {
  postList: [],
  fetchPostsState: { isLoading: true, error: null },
};

export const fetchPosts = createAsyncThunk(
  'postList/fetchPosts',
  async (_, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch('/api/posts?page=1', {
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostsState.isLoading = true;
        state.fetchPostsState.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.fetchPostsState.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsState.isLoading = false;
        state.fetchPostsState.error = action.error;
      });
  },
});

export default postListSlice.reducer;

export const selectPostList = (state: RootState) => state.postList.postList;

export const selectFetchPostListState = (state: RootState) =>
  state.postList.fetchPostsState;
