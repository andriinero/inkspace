import { useAppFetch } from '@/lib/useAppFetch';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { ImageDataSchema } from '@/types/entityData/ImageData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

type AppImageSliceState = {
  imageURLsMap: { [key: string]: string };
  fetchQueue: string[];
};

const initialState: AppImageSliceState = {
  imageURLsMap: {},
  fetchQueue: [],
};

export const fetchImage = createAsyncThunk(
  'appImages/fetchImage',
  async (imageId: string, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(
      `/api/images/${imageId}`,
      {},
      undefined,
      true,
    );

    if (!responseState.ok) throw rejectWithValue(data as ErrorData);

    const validationResult = ImageDataSchema.safeParse(data);
    if (!validationResult.success) console.error(validationResult);
    const imageURL = URL.createObjectURL(data as Blob);

    return { imageId, imageURL };
  },
);

const appImagesSlice = createSlice({
  name: 'appImages',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchImage.pending, (state, action) => {
        state.fetchQueue.push(action.meta.arg);
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        const { imageId, imageURL } = action.payload;

        if (!state.imageURLsMap[imageId])
          state.imageURLsMap[imageId] = imageURL;

        state.fetchQueue = state.fetchQueue.filter(
          (q) => q !== action.meta.arg,
        );
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.fetchQueue = state.fetchQueue.filter(
          (q) => q !== action.meta.arg,
        );
      });
  },
});

export default appImagesSlice.reducer;

export const selectImageURLsMap = (state: RootState) =>
  state.appImages.imageURLsMap;

export const selectImageURL =
  (imageId: string | undefined) => (state: RootState) => {
    return imageId ? state.appImages.imageURLsMap[imageId] : undefined;
  };

export const selectIsImageInQueue =
  (imageId: string | undefined) => (state: RootState) =>
    state.appImages.fetchQueue.some((q) => q === imageId);

export const selectAreImagesLoading = (state: RootState) =>
  state.appImages.fetchQueue.length !== 0;
