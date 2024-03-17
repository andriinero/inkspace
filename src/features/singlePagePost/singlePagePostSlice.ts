import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

import { ZodError } from 'zod';
import { RootState } from '@/app/store';
import { PostData, PostDataSchema } from '@/types/itemData/PostData';
import { PutLikeCountSchema } from '@/types/responseData/success/PutLikeCount';

type SinglePagePostState = {
  post: PostData | null;
  isLiked: boolean;
  likeCount: number;
  fetchPostState: {
    isLoading: boolean;
    error: SerializedError | ZodError | null;
  };
  putLikeCountState: { isLoading: boolean; error: SerializedError | ZodError | null };
};

const initialState: SinglePagePostState = {
  post: null,
  isLiked: false,
  likeCount: 0,
  fetchPostState: {
    isLoading: true,
    error: null,
  },
  putLikeCountState: { isLoading: false, error: null },
};

export const fetchPost = createAsyncThunk(
  'singlePagePost/fetchPost',
  async (postId: string, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(`/api/posts/${postId}`, {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = PostDataSchema.safeParse(data);

    if (!validationResult.success) {
      console.error(validationResult.error);
      return rejectWithValue(validationResult.error);
    }

    return validationResult.data;
  }
);

export const putLikeCount = createAsyncThunk(
  'singlePagePost/putLikeCount',
  async (_, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch(`/api/posts/${postId}/likes`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = PutLikeCountSchema.safeParse(data);

    if (!validationResult.success) {
      console.error(validationResult.error);
      return rejectWithValue(validationResult.error);
    }

    return validationResult.data;
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
        state.likeCount = action.payload.like_count;
        state.fetchPostState.isLoading = false;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.fetchPostState.isLoading = false;
        state.fetchPostState.error = action.error;
      });
    builder
      .addCase(putLikeCount.pending, (state) => {
        state.putLikeCountState.isLoading = false;
        state.putLikeCountState.error = null;
      })
      .addCase(putLikeCount.fulfilled, (state, action) => {
        state.likeCount = action.payload.like_count;
        state.putLikeCountState.isLoading = false;
      })
      .addCase(putLikeCount.rejected, (state, action) => {
        state.putLikeCountState.isLoading = false;
        state.putLikeCountState.error = action.error;
      });
  },
});

export const { toggleIsLiked } = singlePagePostSlice.actions;

export default singlePagePostSlice.reducer;

export const selectSinglePost = (state: RootState) => state.singlePagePost.post;

export const selectCurrentPostData = (state: RootState) => state.singlePagePost.post;

export const selectFetchPostState = (state: RootState) =>
  state.singlePagePost.fetchPostState;

export const selectPostLikeCountState = (state: RootState) =>
  state.singlePagePost.putLikeCountState;

export const selectIsPostLiked = (state: RootState) => state.singlePagePost.isLiked;

export const selectPostLikeCount = (state: RootState) => state.singlePagePost.likeCount;
