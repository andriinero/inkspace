import { ZodError, z } from 'zod';
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import { RootState } from '@/app/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { PostData, PostDataSchema } from '@/types/itemData/PostData';
import { TopicData } from '@/types/itemData/TopicData';

type postListState = {
  postList: PostData[];
  selectedTopic: TopicData | null;
  fetchPostsState: {
    isLoading: boolean;
    error: SerializedError | ZodError | null;
  };
};

const initialState: postListState = {
  postList: [],
  selectedTopic: null,
  fetchPostsState: { isLoading: true, error: null },
};

export const fetchPosts = createAsyncThunk(
  'postList/fetchPosts',
  async (topicId: string = '', { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(
      `/api/posts?page=1&topic=${topicId}`,
      {
        mode: 'cors',
      }
    );

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = z.array(PostDataSchema).safeParse(data);

    if (!validationResult.success) {
      console.error(validationResult);
      return rejectWithValue(validationResult.error);
    }

    return validationResult.data;
  }
);

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
        state.fetchPostsState.error = action.error;
      });
  },
});

export const { setTopic, clearTopic } = postListSlice.actions;

export default postListSlice.reducer;

export const selectPostList = (state: RootState) => state.postList.postList;

export const selectSelectedTopic = (state: RootState) => state.postList.selectedTopic;

export const selectFetchPostListState = (state: RootState) =>
  state.postList.fetchPostsState;
