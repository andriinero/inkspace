import { z } from 'zod';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import { RootState } from '@/app/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { PostData, PostDataSchema } from '@/types/entityData/PostData';
import { TopicData } from '@/types/entityData/TopicData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

type postListState = {
  postList: PostData[];
  selectedTopic: TopicData | null;
  fetchPostsState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
};

const initialState: postListState = {
  postList: [],
  selectedTopic: null,
  fetchPostsState: { isLoading: true, error: null },
};

export const fetchPosts = createAsyncThunk<
  PostData[],
  string,
  { rejectValue: ErrorData }
>('postList/fetchPosts', async (topicId = '', { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch(
    `/api/posts?page=1&topic=${topicId}`,
    {
      mode: 'cors',
    }
  );

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = z.array(PostDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostData[];
});

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    setTopic: {
      reducer(state, action: PayloadAction<TopicData>) {
        if (state.selectedTopic?._id !== action.payload._id)
          state.selectedTopic = action.payload;
      },
      prepare(topic: TopicData) {
        return { payload: topic };
      },
    },
    clearTopic(state) {
      state.selectedTopic = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostsState.isLoading = true;
        state.fetchPostsState.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.fetchPostsState.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsState.isLoading = false;
        state.fetchPostsState.error = action.payload || (action.error as ErrorData);
      });
  },
});

export const { setTopic, clearTopic } = postListSlice.actions;

export default postListSlice.reducer;

export const selectPostList = (state: RootState) => state.postList.postList;

export const selectSelectedTopic = (state: RootState) => state.postList.selectedTopic;

export const selectFetchPostListState = (state: RootState) =>
  state.postList.fetchPostsState;
