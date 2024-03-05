import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

type PostBodyType = {
  title: string;
  topic: string;
  body: string;
};

type CreatePostState = {
  postPostState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: CreatePostState = {
  postPostState: { isLoading: false, error: null },
};

export const postPost = createAsyncThunk(
  'singlePagePost/postPost',
  async (postBody: PostBodyType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const response = await fetch(`http://localhost:3000/api/posts`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postBody),
    });
    const data = await response.json();

    if (!response.ok) return rejectWithValue(data);

    return data;
  }
);

const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postPost.pending, (state) => {
        state.postPostState.isLoading = true;
        state.postPostState.error = null;
      })
      .addCase(postPost.fulfilled, (state) => {
        state.postPostState.isLoading = false;
      })
      .addCase(postPost.rejected, (state, action) => {
        state.postPostState.isLoading = false;
        state.postPostState.error = action.error;
      });
  },
});

export default createPostSlice.reducer;

export const selectPostPostState = (state: RootState) => state.createPost.postPostState;
