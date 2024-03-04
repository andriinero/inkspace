import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

import Post from '@/types/Post';

type SinglePagePostState = {
  post: Post | null;
  isLiked: boolean;
  fetchPostState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
};

const initialState: SinglePagePostState = {
  post: null,
  isLiked: false,
  fetchPostState: {
    isLoading: true,
    error: null,
  },
};

export const fetchPost = createAsyncThunk(
  'singlePagePost/fetchPost',
  async (postid: string, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3000/api/posts/${postid}`, {
      mode: 'cors',
    });
    const data = await response.json();

    if (!response.ok) return rejectWithValue(data);

    return data;
  }
);

const singlePagePostSlice = createSlice({
  name: 'singlePagePost',
  initialState,
  reducers: {
    toggleIsLiked(state) {
      state.isLiked = !state.isLiked;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.fetchPostState.isLoading = true;
        state.fetchPostState.error = null;
        state.post = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.fetchPostState.isLoading = false;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.fetchPostState.isLoading = false;
        state.fetchPostState.error = action.error;
      });
  },
});

export const { toggleIsLiked } = singlePagePostSlice.actions;

export default singlePagePostSlice.reducer;

export const selectSinglePost = (state: RootState) => state.singlePagePost.post;

export const selectCurrentPostData = (state: RootState) => state.singlePagePost.post;

export const selectFetchPostState = (state: RootState) =>
  state.singlePagePost.fetchPostState;

export const selectIsPostLiked = (state: RootState) => state.singlePagePost.isLiked;
