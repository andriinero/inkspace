import { RootState } from '@/app/store';
import Post from '@/types/Post';
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type SinglePagePostState = {
  post: Post | null;
  isLoading: boolean;
  error: SerializedError | null;
  isLiked: boolean;
  isBookmarked: boolean;
  isCommentsOpen: boolean;
};

const initialState: SinglePagePostState = {
  post: null,
  isLoading: true,
  error: null,
  isLiked: false,
  isBookmarked: false,
  isCommentsOpen: false,
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
  reducers: {
    toggleIsLiked(state) {
      state.isLiked = !state.isLiked;
    },
    toggleIsCommentsOpen(state) {
      state.isCommentsOpen = !state.isCommentsOpen;
    },
    toggleIsBookmarked(state) {
      state.isBookmarked = !state.isBookmarked;
    },
  },
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

export const { toggleIsLiked, toggleIsCommentsOpen, toggleIsBookmarked } =
  singlePagePostSlice.actions;

export default singlePagePostSlice.reducer;

export const selectSinglePost = (state: RootState) => state.singlePagePost.post;

export const selectSinglePostState = (state: RootState) => ({
  post: state.singlePagePost.post,
  isLoading: state.singlePagePost.isLoading,
  error: state.singlePagePost.error,
});

export const selectPostData = (state: RootState) => state.singlePagePost.post;

export const selectPostIsLoading = (state: RootState) => state.singlePagePost.isLoading;

export const selectPostError = (state: RootState) => state.singlePagePost.error;

export const selectIsPostLiked = (state: RootState) => state.singlePagePost.isLiked;

export const selectIsCommentsOpen = (state: RootState) =>
  state.singlePagePost.isCommentsOpen;

export const selectIsPostBookmarked = (state: RootState) =>
  state.singlePagePost.isBookmarked;
