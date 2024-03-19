import { useEffect } from 'react';
import { Image, ImagePlaceholder } from './AppImage.styled';
import { FadeIn } from '@/styles/animations/FadeIn';
import { RootState } from '@/app/store';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchImage, selectAreImagesLoading } from '../appImagesSlice';

type AppImageProps = {
  className?: string;
  altText?: string;
  imageId: string;
  placeholderSrc?: string;
};

const selectImageURL = (imageId: string) => (state: RootState) =>
  state.appImages.imageURLsMap[imageId];

const selectIsImageInQueue = (imageId: string) => (state: RootState) =>
  state.appImages.fetchQueue.some((q) => q === imageId);

const AppImage = ({
  className,
  altText,
  imageId,
  placeholderSrc = '/landscape-placeholder.png',
}: AppImageProps) => {
  const imageURL: string = useAppSelector(selectImageURL(imageId));
  const isLoading = useAppSelector(selectAreImagesLoading);
  const isImageInQueue = useAppSelector(selectIsImageInQueue(imageId));

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchImage(imageId));
    };

    if (!imageURL && !isImageInQueue && imageId) fetch();
  }, [imageURL, isImageInQueue, imageId, dispatch]);

  const imgSrc = imageURL ? imageURL : placeholderSrc;

  return isLoading ? (
    <ImagePlaceholder className={className} />
  ) : (
    <Image
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
      className={className}
      src={imgSrc}
      alt={altText}
    />
  );
};

export default AppImage;
