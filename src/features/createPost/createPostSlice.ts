import { RootState } from '@/app/store';
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type PostBodyType = {
  title: string;
  topic: string;
  body: string;
};

type CreatePostState = {
  responseMessage: string | null;
  isLoading: boolean;
  error: SerializedError | null;
  validationErrors: { type: string; message: string }[] | null;
};

const initialState: CreatePostState = {
  responseMessage: null,
  isLoading: false,
  error: null,
  validationErrors: null,
};

export const postPost = createAsyncThunk(
  'singlePagePost/postPost',
  async (postBody: PostBodyType, { getState }) => {
    const { auth } = getState() as { auth: { token: string } };

    const response = await fetch(`http://localhost:3000/api/posts`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(postBody),
    });

    // TODO: add validation error messages
    if (!response.ok) return null;

    const data = await response.json();

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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.payload;
      })
      .addCase(postPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default createPostSlice.reducer;

export const selectCreatePostError = (state: RootState) => state.createPost.error;

export const selectValidationErrors = (state: RootState) =>
  state.createPost.validationErrors;
