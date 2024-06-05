import { z } from "zod";
import { useAppFetch } from "@/lib/useAppFetch";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";
import {
  FullAuthorData,
  FullAuthorDataSchema,
} from "@/types/entityData/FullAuthorData";
import { PostData, PostDataSchema } from "@/types/entityData/PostData";
import { ErrorData } from "@/types/fetchResponse/error/ErrorData";

type AuthorPageState = {
  authorData: FullAuthorData | null;
  authorPosts: PostData[];
  fetchAuthorDataState: { isLoading: boolean; error: ErrorData | null };
  fetchAuthorPostsState: { isLoading: boolean; error: ErrorData | null };
};

const initialState: AuthorPageState = {
  authorData: null,
  authorPosts: [],
  fetchAuthorDataState: { isLoading: true, error: null },
  fetchAuthorPostsState: { isLoading: true, error: null },
};

export const fetchAuthorData = createAsyncThunk<
  FullAuthorData,
  string,
  { rejectValue: ErrorData }
>("authorPage/fetchAuthor", async (authorId, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch(
    `/api/authors/${authorId}`,
    {
      method: "GET",
      mode: "cors",
    },
  );

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = FullAuthorDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult.error);

  return data as FullAuthorData;
});

export const fetchAuthorPosts = createAsyncThunk<
  PostData[],
  string,
  { rejectValue: ErrorData }
>("authorPage/fetchAuthorPosts", async (userId, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch(
    `/api/posts?userid=${userId}`,
    {
      method: "GET",
      mode: "cors",
    },
  );

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = z.array(PostDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostData[];
});

const authorPageSlice = createSlice({
  name: "authorPage",
  initialState,
  reducers: {
    resetState(state) {
      state.authorData = null;
      state.authorPosts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthorData.pending, (state) => {
        state.fetchAuthorDataState.isLoading = true;
        state.fetchAuthorDataState.error = null;
      })
      .addCase(fetchAuthorData.fulfilled, (state, action) => {
        state.authorData = action.payload;
        state.fetchAuthorDataState.isLoading = false;
      })
      .addCase(fetchAuthorData.rejected, (state, action) => {
        state.fetchAuthorDataState.isLoading = false;
        state.fetchAuthorDataState.error =
          action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(fetchAuthorPosts.pending, (state) => {
        state.fetchAuthorPostsState.isLoading = true;
        state.fetchAuthorPostsState.error = null;
      })
      .addCase(fetchAuthorPosts.fulfilled, (state, action) => {
        state.authorPosts = action.payload;
        state.fetchAuthorPostsState.isLoading = false;
      })
      .addCase(fetchAuthorPosts.rejected, (state, action) => {
        state.fetchAuthorPostsState.isLoading = false;
        state.fetchAuthorDataState.error =
          action.payload || (action.error as ErrorData);
      });
  },
});

export const { resetState } = authorPageSlice.actions;

export default authorPageSlice.reducer;

export const selectFetchAuthorDataState = (state: RootState) =>
  state.authorPage.fetchAuthorDataState;

export const selectAuthorData = (state: RootState) =>
  state.authorPage.authorData;

export const selectFetchAuthorPostsState = (state: RootState) =>
  state.authorPage.fetchAuthorPostsState;

export const selectAuthorPosts = (state: RootState) =>
  state.authorPage.authorPosts;
