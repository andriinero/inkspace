import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import { RootState } from '@/app/store';
import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';

type miscListState = {
  authorList: Author[];
  topicList: Topic[];
  authorListState: { isLoading: boolean; error: SerializedError | null };
  topicListState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: miscListState = {
  authorList: [],
  topicList: [],
  authorListState: { isLoading: false, error: null },
  topicListState: { isLoading: false, error: null },
};

export const fetchAuthors = createAsyncThunk(
  'miscList/fetchAuthors',
  async (_, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch('/api/authors?limit=3', {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const fetchTopics = createAsyncThunk(
  'miscList/fetchTopics',
  async (_, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch('/api/topics?limit=5', {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

const miscListSlice = createSlice({
  name: 'miscList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.authorListState.isLoading = true;
        state.authorListState.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authorList = action.payload;
        state.authorListState.isLoading = false;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.authorListState.isLoading = false;
        state.authorListState.error = action.error;
      });

    builder
      .addCase(fetchTopics.pending, (state) => {
        state.topicListState.isLoading = true;
        state.topicListState.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topicList = action.payload;
        state.topicListState.isLoading = false;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.topicListState.isLoading = false;
        state.topicListState.error = action.error;
      });
  },
});

export default miscListSlice.reducer;

export const selectAuthorList = (state: RootState) => state.miscList.authorList;

export const selectTopicList = (state: RootState) => state.miscList.topicList;

export const selectAuthorListState = (state: RootState) => state.miscList.authorListState;

export const selectTopicsListState = (state: RootState) => state.miscList.topicListState;
