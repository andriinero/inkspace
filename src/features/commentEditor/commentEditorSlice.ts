import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

type CommentEditorState = {
  textField: string;
  postCommentState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
  updateCommentState: {
    isEditMode: boolean;
    isLoading: boolean;
    error: SerializedError | null;
  };
};

type PostCommentType = { postId: string; commentBody: string };
type UpdateCommentType = { commentId: string; commentBody: string };

const initialState: CommentEditorState = {
  textField: '',
  postCommentState: {
    isLoading: false,
    error: null,
  },
  updateCommentState: {
    isEditMode: false,
    isLoading: false,
    error: null,
  },
};

export const postComment = createAsyncThunk(
  'comments/postComment',
  async ({ postId, commentBody }: PostCommentType, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: { token: string } };

    const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ body: commentBody }),
    });
    const data = await response.json();

    if (!response.ok) return rejectWithValue(data);

    return data;
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async (
    { commentId, commentBody }: UpdateCommentType,
    { getState, rejectWithValue }
  ) => {
    const { auth } = getState() as { auth: { token: string } };

    const response = await fetch(`http:localhost:3000/api/comments/${commentId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(commentBody),
    });
    const data = await response.json();

    if (!response.ok) return rejectWithValue(data);

    return data;
  }
);

const commentEditorSlice = createSlice({
  name: 'commentEditor',
  initialState,
  reducers: {
    enterEditMode(state) {
      state.updateCommentState.isEditMode = true;
    },
    exitEditMode(state) {
      state.updateCommentState.isEditMode = false;
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

export const { enterEditMode, exitEditMode } = commentEditorSlice.actions;

export default commentEditorSlice.reducer;

export const selectPostCommentState = (state: RootState) =>
  state.commentEditor.postCommentState;

export const selectUpdateCommentState = (state: RootState) =>
  state.commentEditor.updateCommentState;
