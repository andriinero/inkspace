import { RootState } from '@/app/store';

import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Comment } from '@/types/Comment';

type CommentsState = {
  comments: Comment[];
  areCommentsOpen: boolean;
  fetchCommentsState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
  deleteCommentState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
};

const initialState: CommentsState = {
  comments: [],
  areCommentsOpen: false,
  fetchCommentsState: {
    isLoading: false,
    error: null,
  },
  deleteCommentState: {
    isLoading: false,
    error: null,
  },
};

export const fetchComments = createAsyncThunk(
  'commentList/fetchComment',
  async (postId: string, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: 'GET',
      mode: 'cors',
    });
    const data = await response.json();

    if (!response.ok) return rejectWithValue(data);

    return data;
  }
);

export const deleteComment = createAsyncThunk(
  'commentList/deleteComment',
  async (commentId: string, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: { token: string } };

    const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    });
    const data = response.json();

    if (!response.ok) return rejectWithValue(data);

    return data;
  }
);

const commentListSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    addComment(state, action) {
      state.comments.unshift(action.payload);
    },
    editComment(state, action) {
      const commentIndex = state.comments.findIndex(
        (c) => c._id === action.payload.commentId
      );
      state.comments[commentIndex].body = action.payload.commentBody;
      state.comments[commentIndex].edit_date = action.payload.editDate;
    },
    openComments(state) {
      state.areCommentsOpen = true;
    },
    closeComments(state) {
      state.areCommentsOpen = false;
    },
    toggleComments(state) {
      state.areCommentsOpen = !state.areCommentsOpen;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchCommentsState.isLoading = true;
        state.fetchCommentsState.error = null;
        state.comments = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.fetchCommentsState.isLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.fetchCommentsState.isLoading = false;
        state.fetchCommentsState.error = action.error;
      });
    builder
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentState.isLoading = true;
        state.deleteCommentState.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c._id !== action.payload._id);
        state.deleteCommentState.isLoading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteCommentState.isLoading = false;
        state.deleteCommentState.error = action.error;
      });
  },
});

export const { addComment, editComment, openComments, closeComments, toggleComments } =
  commentListSlice.actions;

export default commentListSlice.reducer;

export const selectCommentList = (state: RootState) => state.commentList.comments;

export const selectAreCommentsOpen = (state: RootState) =>
  state.commentList.areCommentsOpen;

export const selectFetchCommentState = (state: RootState) =>
  state.commentList.fetchCommentsState;

export const selectDeleteCommentState = (state: RootState) =>
  state.commentList.deleteCommentState;
