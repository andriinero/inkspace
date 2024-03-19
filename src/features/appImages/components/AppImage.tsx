import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchImage,
  selectAreImagesLoading,
  selectImageURL,
  selectIsImageInQueue,
} from '../appImagesSlice';

import { FadeIn } from '@/styles/animations/FadeIn';

import { Image, BlankPlaceholder } from './AppImage.styled';

type AppImageProps = {
  className?: string;
  altText?: string;
  imageId?: string;
  placeholderSrc?: string;
};

const AppImage = ({
  className,
  altText,
  imageId,
  placeholderSrc = '/landscape-placeholder.png',
}: AppImageProps) => {
  const imageURL = useAppSelector(selectImageURL(imageId));
  const isImageInQueue = useAppSelector(selectIsImageInQueue(imageId));
  const isLoading = useAppSelector(selectAreImagesLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchImage(imageId!));
    };

    if (!imageURL && !isImageInQueue && imageId) fetch();
  }, [imageURL, isImageInQueue, imageId, dispatch]);

  const imgSrc = imageURL ? imageURL : placeholderSrc;

  if (!imageId)
    return (
      <Image
        initial={FadeIn.hidden}
        animate={FadeIn.visible}
        transition={FadeIn.transition}
        className={className}
        src={imgSrc}
        alt={altText}
      />
    );

  return isLoading ? (
    <BlankPlaceholder className={className} />
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
