import { useAppFetch } from "@/lib/useAppFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import storage from "@/lib/storage";

import { RootState } from "@/app/store";
import { CommentData, CommentDataSchema } from "@/types/entityData/CommentData";
import { ErrorData } from "@/types/fetchResponse/error/ErrorData";
import {
  TargetObjectId,
  TargetObjectIdSchema,
} from "@/types/fetchResponse/success/TargetObjectId";

type CommentsState = {
  comments: CommentData[];
  areCommentsOpen: boolean;
  fetchCommentsState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
  deleteCommentState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
};

const initialState: CommentsState = {
  comments: [],
  areCommentsOpen: false,
  fetchCommentsState: {
    isLoading: true,
    error: null,
  },
  deleteCommentState: {
    isLoading: false,
    error: null,
  },
};

export const fetchComments = createAsyncThunk<
  CommentData[],
  string,
  { rejectValue: ErrorData }
>("commentList/fetchComments", async (postId, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch(
    `/api/posts/${postId}/comments`,
    {
      method: "GET",
      mode: "cors",
    },
  );

  if (!responseState.ok) return rejectWithValue(data as ErrorData);

  const validationResult = z.array(CommentDataSchema).safeParse(data);

  if (!validationResult.success) console.error(validationResult);

  return data as CommentData[];
});

export const deleteComment = createAsyncThunk<
  TargetObjectId,
  string,
  { rejectValue: ErrorData }
>("commentList/deleteComment", async (commentId, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch(
    `/api/comments/${commentId}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!responseState.ok) return rejectWithValue(data as ErrorData);

  const validationResult = TargetObjectIdSchema.safeParse(data);

  if (!validationResult.success) console.error(validationResult);

  return data as TargetObjectId;
});

const commentListSlice = createSlice({
  name: "commentList",
  initialState,
  reducers: {
    addComment(state, action) {
      state.comments.unshift(action.payload);
    },
    editComment(state, action) {
      const commentIndex = state.comments.findIndex(
        (c) => c._id === action.payload.commentId,
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
        state.comments = [];
        state.fetchCommentsState.isLoading = true;
        state.fetchCommentsState.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.fetchCommentsState.isLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.fetchCommentsState.isLoading = false;
        state.fetchCommentsState.error =
          action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentState.isLoading = true;
        state.deleteCommentState.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (c) => c._id !== action.payload._id,
        );
        state.deleteCommentState.isLoading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteCommentState.isLoading = false;
        state.fetchCommentsState.error =
          action.payload || (action.error as ErrorData);
      });
  },
});

export const {
  addComment,
  editComment,
  openComments,
  closeComments,
  toggleComments,
} = commentListSlice.actions;

export default commentListSlice.reducer;

export const selectCommentById = (id: string) => (state: RootState) =>
  state.commentList.comments.find((c) => c._id === id);

export const selectCommentList = (state: RootState) =>
  state.commentList.comments;

export const selectAreCommentsOpen = (state: RootState) =>
  state.commentList.areCommentsOpen;

export const selectFetchCommentState = (state: RootState) =>
  state.commentList.fetchCommentsState;

export const selectDeleteCommentState = (state: RootState) =>
  state.commentList.deleteCommentState;
