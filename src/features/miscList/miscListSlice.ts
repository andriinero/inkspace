import { z } from 'zod';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/lib/storage';

import { RootState } from '@/app/store';
import {
  FullAuthorData,
  FullAuthorDataSchema,
} from '@/types/entityData/FullAuthorData';
import { TopicData, TopicDataSchema } from '@/types/entityData/TopicData';
import { PostData, PostDataSchema } from '@/types/entityData/PostData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

type miscListState = {
  authorList: FullAuthorData[];
  topicList: TopicData[];
  postList: PostData[];
  bookmarkList: PostData[];
  fetchAuthorsState: { isLoading: boolean; error: ErrorData | null };
  fetchTopicsState: { isLoading: boolean; error: ErrorData | null };
  fetchPostsState: { isLoading: boolean; error: ErrorData | null };
  fetchBookmarksState: { isLoading: boolean; error: ErrorData | null };
};

const initialState: miscListState = {
  authorList: [],
  topicList: [],
  postList: [],
  bookmarkList: [],
  fetchAuthorsState: { isLoading: false, error: null },
  fetchTopicsState: { isLoading: false, error: null },
  fetchPostsState: { isLoading: false, error: null },
  fetchBookmarksState: { isLoading: false, error: null },
};

export const fetchAuthors = createAsyncThunk<
  FullAuthorData[],
  void,
  { rejectValue: ErrorData }
>('miscList/fetchAuthors', async (_, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch('/api/authors?random=3', {
    method: 'GET',
    mode: 'cors',
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = z.array(FullAuthorDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as FullAuthorData[];
});

export const fetchTopics = createAsyncThunk<
  TopicData[],
  void,
  { rejectValue: ErrorData }
>('miscList/fetchTopics', async (_, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch('/api/topics?random=10', {
    method: 'GET',
    mode: 'cors',
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = z.array(TopicDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as TopicData[];
});

export const fetchMiscPosts = createAsyncThunk<
  PostData[],
  void,
  { rejectValue: ErrorData }
>('miscList/fetchMiscPosts', async (_, { rejectWithValue }) => {
  const { data, responseState } = await useAppFetch('/api/posts?random=3', {
    method: 'GET',
    mode: 'cors',
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = z.array(PostDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostData[];
});

export const fetchBookmarks = createAsyncThunk<
  PostData[],
  void,
  { rejectValue: ErrorData }
>('miscList/fetchBookmarks', async (_, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch(
    '/api/profile/bookmarks?limit=4',
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = z.array(PostDataSchema).safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PostData[];
});

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
        state.fetchAuthorsState.error =
          action.payload || (action.error as ErrorData);
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
        state.fetchTopicsState.error =
          action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(fetchMiscPosts.pending, (state) => {
        state.fetchPostsState.isLoading = true;
        state.fetchPostsState.error = null;
      })
      .addCase(fetchMiscPosts.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.postList.sort((a, b) => (a.title < b.title ? 1 : -1));
        state.fetchPostsState.isLoading = false;
      })
      .addCase(fetchMiscPosts.rejected, (state, action) => {
        state.fetchPostsState.isLoading = false;
        state.fetchPostsState.error =
          action.payload || (action.error as ErrorData);
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
        state.fetchBookmarksState.error =
          action.payload || (action.error as ErrorData);
      });
  },
});

export default miscListSlice.reducer;

export const selectFetchMiscAuthorsState = (state: RootState) =>
  state.miscList.fetchAuthorsState;

export const selectMiscAuthorList = (state: RootState) =>
  state.miscList.authorList;

export const selectFetchMiscTopicsState = (state: RootState) =>
  state.miscList.fetchTopicsState;

export const selectMiscTopicList = (state: RootState) =>
  state.miscList.topicList;

export const selectFetchMiscPostsState = (state: RootState) =>
  state.miscList.fetchPostsState;

export const selectMiscPostList = (state: RootState) => state.miscList.postList;

export const selectFetchMiscBookmarksState = (state: RootState) =>
  state.miscList.fetchBookmarksState;

export const selectMiscBookmarkList = (state: RootState) =>
  state.miscList.bookmarkList;
