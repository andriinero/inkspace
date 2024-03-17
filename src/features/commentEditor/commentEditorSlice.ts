import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

import { RootState } from '@/app/store';
import { CommentDataSchema } from '@/types/itemData/CommentData';
import { ZodError } from 'zod';

type CommentEditorState = {
  textField: string;
  isEditMode: boolean;
  postCommentState: {
    isLoading: boolean;
    error: SerializedError | ZodError | null;
  };
  updateCommentState: {
    commentId: string | null;
    isLoading: boolean;
    error: SerializedError | ZodError | null;
  };
};

type PostCommentType = { postId: string; commentBody: string };
type UpdateCommentType = { commentId: string; commentBody: string };

const initialState: CommentEditorState = {
  textField: '',
  isEditMode: false,
  postCommentState: {
    isLoading: false,
    error: null,
  },
  updateCommentState: {
    commentId: null,
    isLoading: false,
    error: null,
  },
};

// TODO: move to comment list slice
export const postComment = createAsyncThunk(
  'comments/postComment',
  async ({ postId, commentBody }: PostCommentType, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body: commentBody }),
    });

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = CommentDataSchema.safeParse(data);

    if (!validationResult.success) {
      console.error(validationResult);
      return rejectWithValue(validationResult.error);
    }

    return validationResult.data;
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, commentBody }: UpdateCommentType, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body: commentBody }),
    });

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = CommentDataSchema.safeParse(data);

    if (!validationResult.success) {
      console.error(validationResult);
      return rejectWithValue(validationResult.error);
    }

    return validationResult.data;
  }
);

const commentEditorSlice = createSlice({
  name: 'commentEditor',
  initialState,
  reducers: {
    setCommentTextField(state, action) {
      state.textField = action.payload;
    },
    enterEditMode(state, action) {
      state.textField = action.payload.commentBody;
      state.isEditMode = true;
      state.updateCommentState.commentId = action.payload.commentId;
    },
    exitEditMode(state) {
      state.textField = '';
      state.isEditMode = false;
      state.updateCommentState.commentId = null;
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
      .addCase(postComment.rejected, (state, payload) => {
        state.postCommentState.isLoading = true;
        state.postCommentState.error = payload.error;
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
        state.updateCommentState.error = action.error;
      });
  },
});

export const { setCommentTextField, enterEditMode, exitEditMode } =
  commentEditorSlice.actions;

export default commentEditorSlice.reducer;

export const selectCommentTextField = (state: RootState) => state.commentEditor.textField;

export const selectCommentIsEditMode = (state: RootState) =>
  state.commentEditor.isEditMode;

export const selectEditCommentId = (state: RootState) =>
  state.commentEditor.updateCommentState.commentId;

export const selectPostCommentState = (state: RootState) =>
  state.commentEditor.postCommentState;

export const selectUpdateCommentState = (state: RootState) =>
  state.commentEditor.updateCommentState;
