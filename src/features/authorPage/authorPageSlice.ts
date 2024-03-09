import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Author } from '@/types/Author';
import { useAppFetch } from '@/lib/useAppFetch';
import { RootState } from '@/app/store';

type AuthorPageState = {
  authorData: Author | null;
  fetchAuthorState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: AuthorPageState = {
  authorData: null,
  fetchAuthorState: { isLoading: false, error: null },
};

export const fetchAuthor = createAsyncThunk(
  'authorPage/fetchAuthor',
  async (authorId: string, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(`/api/authors/${authorId}`, {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    return data;
  }
);

const authorPageSlice = createSlice({
  name: 'authorPage',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.fetchAuthorState.isLoading = true;
        state.fetchAuthorState.error = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.authorData = action.payload;
        state.fetchAuthorState.isLoading = false;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.fetchAuthorState.isLoading = false;
        state.fetchAuthorState.error = action.error;
      });
  },
});

export default authorPageSlice.reducer;

export const selectAuthorData = (state: RootState) => state.authorPage.authorData;

export const selectFetchAuthorState = (state: RootState) =>
  state.authorPage.fetchAuthorState;
