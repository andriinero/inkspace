import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

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
  async (postBody: PostBodyType, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch(`/api/posts`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postBody),
    });

    if (!responseState.ok) return rejectWithValue(data);

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
