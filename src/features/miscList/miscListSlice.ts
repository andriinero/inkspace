import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

import { RootState } from '@/app/store';
import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';
import Post from '@/types/Post';

type miscListState = {
  authorList: Author[];
  topicList: Topic[];
  bookmarkList: Post[];
  fetchAuthorsState: { isLoading: boolean; error: SerializedError | null };
  fetchTopicsState: { isLoading: boolean; error: SerializedError | null };
  fetchBookmarksState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: miscListState = {
  authorList: [],
  topicList: [],
  bookmarkList: [],
  fetchAuthorsState: { isLoading: true, error: null },
  fetchTopicsState: { isLoading: true, error: null },
  fetchBookmarksState: { isLoading: true, error: null },
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
    const { data, responseState } = await useAppFetch('/api/topics?limit=7', {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

export const fetchBookmarks = createAsyncThunk(
  'miscList/fetchBookmarks',
  async (_, { rejectWithValue }) => {
    const token = storage.getToken();

    const { data, responseState } = await useAppFetch('/api/profile/bookmarks?limit=4', {
      method: 'GET',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!responseState.ok) rejectWithValue(data);

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
        state.fetchAuthorsState.isLoading = true;
        state.fetchAuthorsState.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authorList = action.payload;
        state.fetchAuthorsState.isLoading = false;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.fetchAuthorsState.isLoading = false;
        state.fetchAuthorsState.error = action.error;
      });

    builder
      .addCase(fetchTopics.pending, (state) => {
        state.fetchTopicsState.isLoading = true;
        state.fetchTopicsState.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topicList = action.payload;
        state.fetchTopicsState.isLoading = false;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.fetchTopicsState.isLoading = false;
        state.fetchTopicsState.error = action.error;
      });
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.fetchBookmarksState.isLoading = true;
        state.fetchBookmarksState.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.bookmarkList = action.payload.post_bookmarks;
        state.fetchBookmarksState.isLoading = false;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.fetchBookmarksState.isLoading = false;
        state.fetchBookmarksState.error = action.error;
      });
  },
});

export default miscListSlice.reducer;

export const selectAuthorList = (state: RootState) => state.miscList.authorList;

export const selectTopicList = (state: RootState) => state.miscList.topicList;

export const selectBookmarkList = (state: RootState) => state.miscList.bookmarkList;

export const selectFetchAuthorsState = (state: RootState) =>
  state.miscList.fetchAuthorsState;

export const selectFetchTopicsState = (state: RootState) =>
  state.miscList.fetchTopicsState;

export const selectFetchBookmarksState = (state: RootState) =>
  state.miscList.fetchBookmarksState;
