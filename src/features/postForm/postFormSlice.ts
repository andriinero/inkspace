import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/lib/storage';

import { RootState } from '@/app/store';
import { PostData, PostDataSchema } from '@/types/itemData/PostData';
import { ErrorData } from '@/types/responseData/error/ErrorData';
import { TPostFormSchema } from '@/types/formSchemas/CreatePostSchema';

type PostBodyType = {
  title: string;
  topic: string;
  body: string;
};

type CreatePostState = {
  editTargetPostData: PostData | null;
  editTargetPostId: string | null;
  isEditMode: boolean;
  postPostState: { isLoading: boolean; error: SerializedError | null };
  fetchEditTargetPostState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: CreatePostState = {
  editTargetPostData: null,
  editTargetPostId: null,
  isEditMode: false,
  postPostState: { isLoading: false, error: null },
  fetchEditTargetPostState: { isLoading: false, error: null },
};

export const postPost = createAsyncThunk(
  'postForm/postPost',
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

export const fetchEditTargetPost = createAsyncThunk(
  'postForm/fetchEditTargetPost',
  async (postId: string, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(`/api/posts/${postId}`, {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = PostDataSchema.safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as PostData;
  }
);

export const putEditTargetPost = createAsyncThunk(
  'postForm/putEditTargetPost',
  async (postData: TPostFormSchema, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch(`/api/posts/${postId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        body: JSON.stringify(postData),
      },
    });

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = PostDataSchema.safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as PostData;
  }
);

const createPostSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    enterEditMode(state, action) {
      state.isEditMode = true;
      state.editTargetPostId = action.payload;
    },
    exitEditMode(state) {
      state.isEditMode = false;
      state.editTargetPostId = null;
      state.editTargetPostData = null;
    },
  },
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
    builder
      .addCase(fetchEditTargetPost.pending, (state) => {
        state.fetchEditTargetPostState.isLoading = true;
        state.fetchEditTargetPostState.error = null;
      })
      .addCase(fetchEditTargetPost.fulfilled, (state, action) => {
        state.editTargetPostData = action.payload;
        state.fetchEditTargetPostState.isLoading = false;
      })
      .addCase(fetchEditTargetPost.rejected, (state, action) => {
        state.fetchEditTargetPostState.isLoading = false;
        state.fetchEditTargetPostState.error = action.error;
      });
  },
});

export const { enterEditMode, exitEditMode } = createPostSlice.actions;

export default createPostSlice.reducer;

export const selectEditPostData = (state: RootState) => state.postForm.editTargetPostData;

export const selectEditPostId = (state: RootState) => state.postForm.editTargetPostId;

export const selectPostIsEditMode = (state: RootState) => state.postForm.isEditMode;

export const selectPostPostState = (state: RootState) => state.postForm.postPostState;

export const selectFetchTargetPostState = (state: RootState) =>
  state.postForm.fetchEditTargetPostState;
