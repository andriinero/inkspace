import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import { RootState } from '@/app/store';
import { PayloadAction } from '@reduxjs/toolkit';

import Post from '@/types/Post';
import { Topic } from '@/types/Topic';

type postListState = {
  postList: Post[];
  selectedTopic: Topic | null;
  fetchPostsState: {
    isLoading: boolean;
    error: SerializedError | null;
  };
};

const initialState: postListState = {
  postList: [],
  selectedTopic: null,
  fetchPostsState: { isLoading: true, error: null },
};

export const fetchPosts = createAsyncThunk(
  'postList/fetchPosts',
  async (topicName: string = '', { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(
      `/api/posts?page=1&topic=${topicName}`,
      {
        mode: 'cors',
      }
    );

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    setTopic: {
      reducer(state, action: PayloadAction<Topic>) {
        if (state.selectedTopic?._id !== action.payload._id)
          state.selectedTopic = action.payload;
      },
      prepare(topic: Topic) {
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
