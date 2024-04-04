import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/lib/storage';

import { RootState } from '@/app/store';
import { CommentData, CommentDataSchema } from '@/types/entityData/CommentData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

type CommentEditorState = {
  commentId: string | null;
  isEditMode: boolean;
  isOverflown: boolean;
  postCommentState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
  updateCommentState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
};

const initialState: CommentEditorState = {
  commentId: null,
  isEditMode: false,
  isOverflown: false,
  postCommentState: {
    isLoading: false,
    error: null,
  },
  updateCommentState: {
    isLoading: false,
    error: null,
  },
};

export const postComment = createAsyncThunk<
  CommentData,
  string,
  { rejectValue: ErrorData; state: RootState }
>('comments/postComment', async (body, { rejectWithValue, getState }) => {
  const token = storage.getToken();

  const postId = getState().singlePagePost.post?._id;

  const { data, responseState } = await useAppFetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body }),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = CommentDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as CommentData;
});

export const updateComment = createAsyncThunk<
  CommentData,
  string,
  { rejectValue: ErrorData; state: RootState }
>('comments/updateComment', async (body, { rejectWithValue, getState }) => {
  const token = storage.getToken();

  const editCommentId = getState().commentEditor.commentId;

  const { data, responseState } = await useAppFetch(`/api/comments/${editCommentId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body }),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = CommentDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as CommentData;
});

const commentEditorSlice = createSlice({
  name: 'commentEditor',
  initialState,
  reducers: {
    enterEditMode(state, action) {
      state.commentId = action.payload.commentId;
      state.isEditMode = true;
    },
    exitEditMode(state) {
      state.commentId = null;
      state.isEditMode = false;
    },
    setIsOverflown(state, action: PayloadAction<boolean>) {
      state.isOverflown = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postComment.pending, (state) => {
        state.postCommentState.isLoading = true;
        state.postCommentState.error = null;
      })
      .addCase(postComment.fulfilled, (state) => {
        state.postCommentState.isLoading = false;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.postCommentState.isLoading = true;
        state.postCommentState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(updateComment.pending, (state) => {
        state.updateCommentState.isLoading = true;
        state.updateCommentState.error = null;
      })
      .addCase(updateComment.fulfilled, (state) => {
        state.updateCommentState.isLoading = false;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.updateCommentState.isLoading = false;
        state.postCommentState.error = action.payload || (action.error as ErrorData);
      });
  },
});

export const { enterEditMode, exitEditMode, setIsOverflown } = commentEditorSlice.actions;

export default commentEditorSlice.reducer;

export const selectCommentIsEditMode = (state: RootState) =>
  state.commentEditor.isEditMode;

export const selectIsCommentOverflown = (state: RootState) =>
  state.commentEditor.isOverflown;

export const selectEditCommentId = (state: RootState) => state.commentEditor.commentId;

export const selectPostCommentState = (state: RootState) =>
  state.commentEditor.postCommentState;

export const selectUpdateCommentState = (state: RootState) =>
  state.commentEditor.updateCommentState;
