import { RootState } from '@/app/store';
import { useAppFetch } from '@/lib/useAppFetch';
import { ImageDataSchema } from '@/types/itemData/ImageData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type AppImageSliceState = {
  imageURLsMap: { [key: string]: string };
  fetchCount: number;
  fetchQueue: string[];
};

const initialState: AppImageSliceState = {
  imageURLsMap: {},
  fetchCount: 0,
  fetchQueue: [],
};

export const fetchImage = createAsyncThunk(
  'appImages/fetchImage',
  async (imageId: string, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(
      `/api/images/${imageId}`,
      {},
      undefined,
      true
    );

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = ImageDataSchema.safeParse(data);

    if (!validationResult.success) {
      console.error(validationResult);
      return rejectWithValue(validationResult.error);
    }

    const imageURL = URL.createObjectURL(data as Blob);

    return { imageId, imageURL };
  }
);

const appImagesSlice = createSlice({
  name: 'appImages',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchImage.pending, (state, action) => {
        state.fetchCount += 1;
        state.fetchQueue.push(action.meta.arg);
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        const { imageId, imageURL } = action.payload;

        if (!state.imageURLsMap[imageId]) state.imageURLsMap[imageId] = imageURL;

        state.fetchCount -= 1;
        state.fetchQueue = state.fetchQueue.filter((q) => q !== action.meta.arg);
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.fetchCount -= 1;
        state.fetchQueue = state.fetchQueue.filter((q) => q !== action.meta.arg);
      });
  },
});

export default appImagesSlice.reducer;

export const selectImageFetchCount = (state: RootState) => state.appImages.fetchCount;

export const selectAreImagesLoading = (state: RootState) =>
  Boolean(state.appImages.fetchCount);

export const selectImageURLsMap = (state: RootState) => state.appImages.imageURLsMap;
