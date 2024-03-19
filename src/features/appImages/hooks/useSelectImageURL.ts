import { RootState } from '@/app/store';

export const selectImageURL = (imageId: string) => (state: RootState) =>
  state.appImages.imageURLsMap.get(imageId);
