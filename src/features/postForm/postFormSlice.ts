import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppFetch } from "@/lib/useAppFetch";

import storage from "@/lib/storage";

import { RootState } from "@/app/store";
import { PostData, PostDataSchema } from "@/types/entityData/PostData";
import { ErrorData } from "@/types/fetchResponse/error/ErrorData";
import { TPostFormSchema } from "@/types/formSchemas/CreatePostSchema";
import { formDataBuilder } from "@/utils/formDataBuilder";
import {
  TargetObjectId,
  TargetObjectIdSchema,
} from "@/types/fetchResponse/success/TargetObjectId";

type CreatePostState = {
  editTargetPostData: PostData | null;
  editTargetPostId: string | null;
  isEditMode: boolean;
  postPostState: { isLoading: boolean; error: ErrorData | null };
  fetchEditTargetPostState: { isLoading: boolean; error: ErrorData | null };
};

const initialState: CreatePostState = {
  editTargetPostData: null,
  editTargetPostId: null,
  isEditMode: false,
  postPostState: { isLoading: false, error: null },
  fetchEditTargetPostState: { isLoading: false, error: null },
};

export const postPost = createAsyncThunk<
  TargetObjectId,
  TPostFormSchema,
  { rejectValue: ErrorData }
>("postForm/postPost", async (postBody, { rejectWithValue }) => {
  const token = storage.getToken();

  const formData = formDataBuilder(postBody);

  const { data, responseState } = await useAppFetch(`/api/posts`, {
    method: "POST",
    mode: "cors",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = TargetObjectIdSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as TargetObjectId;
});

export const fetchEditTargetPost = createAsyncThunk<
  PostData,
  string,
  { rejectValue: ErrorData }
>("postForm/fetchEditTargetPost", async (postId, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch(`/api/posts/${postId}`, {
    method: "GET",
    mode: "cors",
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = PostDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostData;
});

export const putEditTargetPost = createAsyncThunk<
  PostData,
  TPostFormSchema,
  { rejectValue: ErrorData }
>(
  "postForm/putEditTargetPost",
  async (postData, { getState, rejectWithValue }) => {
    const token = storage.getToken();
    const state = getState() as { postForm: { editTargetPostId: string } };

    const formData = formDataBuilder(postData);

    const { data, responseState } = await useAppFetch(
      `/api/posts/${state.postForm.editTargetPostId}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = PostDataSchema.safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as PostData;
  },
);

const createPostSlice = createSlice({
  name: "postForm",
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
        state.postPostState.error =
          action.payload || (action.error as ErrorData);
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
        state.postPostState.error =
          action.payload || (action.error as ErrorData);
      });
  },
});

export const { enterEditMode, exitEditMode } = createPostSlice.actions;

export default createPostSlice.reducer;

export const selectEditPostData = (state: RootState) =>
  state.postForm.editTargetPostData;

export const selectEditPostId = (state: RootState) =>
  state.postForm.editTargetPostId;

export const selectPostIsEditMode = (state: RootState) =>
  state.postForm.isEditMode;

export const selectPostPostState = (state: RootState) =>
  state.postForm.postPostState;

export const selectFetchTargetPostState = (state: RootState) =>
  state.postForm.fetchEditTargetPostState;
