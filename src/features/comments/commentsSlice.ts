import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Comment } from '@/types/Comment';
import { RootState } from '@/app/store';

type CommentsState = {
  comments: Comment[];
  areCommentsOpen: boolean;
  fetchCommentsState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
  postCommentState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
};

type PostCommentType = { postId: string; commentBody: string };

// TODO: add more states for better UX
const initialState: CommentsState = {
  comments: [],
  areCommentsOpen: false,
  fetchCommentsState: {
    isLoading: false,
    error: null,
  },
  postCommentState: {
    isLoading: false,
    error: null,
  },
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComment',
  async (postId: string) => {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: 'GET',
      mode: 'cors',
    });
    const data = await response.json();

    return data;
  }
);

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

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
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
        state.fetchCommentsState.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.fetchCommentsState.isLoading = false;
        state.fetchCommentsState.error = action.error;
      });
    builder
      .addCase(postComment.pending, (state) => {
        state.postCommentState.isLoading = true;
        state.postCommentState.error = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.postCommentState.isLoading = false;
        state.comments.splice(0, 0, action.payload);
      })
      .addCase(postComment.rejected, (state, payload) => {
        state.postCommentState.isLoading = true;
        state.postCommentState.error = payload.error;
      });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter((c) => c._id !== action.payload._id);
    });
  },
});

export const { openComments, closeComments, toggleComments } = commentsSlice.actions;

export default commentsSlice.reducer;

export const selectCommentList = (state: RootState) => state.comments.comments;

export const selectAreCommentsOpen = (state: RootState) => state.comments.areCommentsOpen;

export const selectFetchCommentState = (state: RootState) =>
  state.comments.fetchCommentsState;

export const selectPostCommentState = (state: RootState) =>
  state.comments.postCommentState;
