import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';

type AuthorsState = {
  authorList: Author[];
  isLoading: boolean;
  error: SerializedError | null;
};

type TopicsState = {
  topicList: Topic[];
  isLoading: boolean;
  error: SerializedError | null;
};

type miscListState = {
  authors: AuthorsState;
  topics: TopicsState;
};

const initialState: miscListState = {
  authors: { authorList: [], isLoading: false, error: null },
  topics: { topicList: [], isLoading: false, error: null },
};

export const fetchAuthors = createAsyncThunk('miscList/fetchAuthors', async () => {
  const response = await fetch('http://localhost:3000/api/authors?limit=3', {
    mode: 'cors',
  });
  const data = await response.json();

  return data;
});

export const fetchTopics = createAsyncThunk('miscList/fetchTopics', async () => {
  const response = await fetch('http://localhost:3000/api/topics?limit=5', {
    mode: 'cors',
  });
  const data = await response.json();

  return data;
});

const miscListSlice = createSlice({
  name: 'miscList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.authors.isLoading = true;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authors.isLoading = false;
        state.authors.authorList = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.authors.isLoading = false;
        state.authors.error = action.error;
      });

    builder
      .addCase(fetchTopics.pending, (state) => {
        state.topics.isLoading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topics.isLoading = false;
        state.topics.topicList = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.topics.isLoading = false;
        state.topics.error = action.error;
      });
  },
});

export default miscListSlice.reducer;

export const selectAuthorListState = (state: RootState) => state.miscList.authors;

export const selectTopicsListState = (state: RootState) => state.miscList.topics;
