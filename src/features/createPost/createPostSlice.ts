import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/lib/storage';

import { RootState } from '@/app/store';
import { PostData, PostDataSchema } from '@/types/itemData/PostData';
import { ErrorData } from '@/types/responseData/error/ErrorData';

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

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = PostDataSchema.safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as PostData;
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
