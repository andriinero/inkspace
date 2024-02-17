import { RootState } from '@/app/store';
import { Author } from '@/types/Author';
import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type miscListState = {
  authorList: Author[];
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: miscListState = {
  authorList: [],
  isLoading: false,
  error: null,
};

export const fetchAuthors = createAsyncThunk('miscList/fetchAuthors', async () => {
  const response = await fetch('http://localhost:3000/api/users', { mode: 'cors' });
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
        state.isLoading = true;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorList = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default miscListSlice.reducer;

export const selectAuthorListState = (state: RootState) => ({
  authorList: state.miscList.authorList,
  isLoading: state.miscList.isLoading,
  error: state.miscList.error,
});
