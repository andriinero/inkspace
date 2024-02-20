import { RootState } from '@/app/store';
import Post from '@/types/Post';
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type singlePagePostState = {
  post: Post | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: singlePagePostState = {
  post: null,
  isLoading: true,
  error: null,
};

export const fetchPost = createAsyncThunk(
  'singlePagePost/fetchPost',
  async (postid: string) => {
    const response = await fetch(`http://localhost:3000/api/posts/${postid}`, {
      mode: 'cors',
    });
    const data = await response.json();

    return data;
  }
);

const singlePagePostSlice = createSlice({
  name: 'singlePagePost',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
        state.post = null;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default singlePagePostSlice.reducer;

export const selectSinglePost = (state: RootState) => state.singlePagePost.post;

export const selectSinglePostState = (state: RootState) => ({
  post: state.singlePagePost.post,
  isLoading: state.singlePagePost.isLoading,
  error: state.singlePagePost.error,
});
