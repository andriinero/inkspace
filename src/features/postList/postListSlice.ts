import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import Post from '@/types/Post';

type postListState = { postList: Post[]; isLoading: boolean; error: Error | null };

const initialState: postListState = { postList: [], isLoading: true, error: null };

export const fetchPosts = createAsyncThunk('postList/fetchPosts', async () => {
  const response = await fetch('http://localhost:3000/api/posts', { mode: 'cors' });
  const posts = await response.json();

  console.log(posts);

  return posts;
});

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postList = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = new Error('an error has occurred');
      });
  },
});

export default postListSlice.reducer;

export const selectAllPosts = (state: RootState) => state.postList.postList;

export const selectPostListState = (state: RootState) => ({
  postList: state.postList.postList,
  isLoading: state.postList.isLoading,
  error: state.postList.error,
});
