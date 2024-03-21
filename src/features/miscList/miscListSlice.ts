import { z } from 'zod';
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/utils/storage';

import { RootState } from '@/app/store';
import { FullAuthorData, FullAuthorDataSchema } from '@/types/itemData/FullAuthorData';
import { TopicData, TopicDataSchema } from '@/types/itemData/TopicData';
import { PostData, PostDataSchema } from '@/types/itemData/PostData';
import { ErrorData } from '@/types/responseData/error/ErrorData';

type miscListState = {
  authorList: FullAuthorData[];
  topicList: TopicData[];
  postList: PostData[];
  bookmarkList: PostData[];
  //FIXME: naming
  fetchAuthorsState: { isLoading: boolean; error: SerializedError | null };
  fetchTopicsState: { isLoading: boolean; error: SerializedError | null };
  fetchMiscPostsState: { isLoading: boolean; error: SerializedError | null };
  fetchBookmarksState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: miscListState = {
  authorList: [],
  topicList: [],
  postList: [],
  bookmarkList: [],
  fetchAuthorsState: { isLoading: true, error: null },
  fetchTopicsState: { isLoading: true, error: null },
  fetchMiscPostsState: { isLoading: true, error: null },
  fetchBookmarksState: { isLoading: true, error: null },
};

export const fetchAuthors = createAsyncThunk(
  'miscList/fetchAuthors',
  async (_, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch('/api/authors?random=3', {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = z.array(FullAuthorDataSchema).safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as FullAuthorData[];
  }
);

export const fetchTopics = createAsyncThunk(
  'miscList/fetchTopics',
  async (_, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch('/api/topics?random=7', {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = z.array(TopicDataSchema).safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as TopicData;
  }
);

export const fetchMiscPosts = createAsyncThunk(
  'miscList/fetchMiscPosts',
  async (_, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch('/api/posts?random=3', {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = z.array(PostDataSchema).safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as PostData[];
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

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = z.array(PostDataSchema).safeParse(data);
    if (!validationResult.success) console.error(validationResult);

    return data as PostData[];
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
        state.authorList.sort((a, b) => (a.username > b.username ? 1 : -1));
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
        state.topicList.sort((a, b) => (a.name < b.name ? 1 : -1));
        state.fetchTopicsState.isLoading = false;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.fetchTopicsState.isLoading = false;
        state.fetchTopicsState.error = action.error;
      });
    builder
      .addCase(fetchMiscPosts.pending, (state) => {
        state.fetchMiscPostsState.isLoading = true;
        state.fetchMiscPostsState.error = null;
      })
      .addCase(fetchMiscPosts.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.postList.sort((a, b) => (a.title < b.title ? 1 : -1));
        state.fetchMiscPostsState.isLoading = false;
      })
      .addCase(fetchMiscPosts.rejected, (state, action) => {
        state.fetchMiscPostsState.isLoading = false;
        state.fetchMiscPostsState.error = action.error;
      });
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.fetchBookmarksState.isLoading = true;
        state.fetchBookmarksState.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.bookmarkList = action.payload;
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

export const selectMiscPostList = (state: RootState) => state.miscList.postList;

export const selectBookmarkList = (state: RootState) => state.miscList.bookmarkList;

export const selectFetchAuthorsState = (state: RootState) =>
  state.miscList.fetchAuthorsState;

export const selectFetchTopicsState = (state: RootState) =>
  state.miscList.fetchTopicsState;

export const selectFetchMiscPostsState = (state: RootState) =>
  state.miscList.fetchMiscPostsState;

export const selectFetchBookmarksState = (state: RootState) =>
  state.miscList.fetchBookmarksState;
