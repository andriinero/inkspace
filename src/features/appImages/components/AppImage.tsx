import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import {
  fetchImage,
  selectAreImagesLoading,
  selectImageURL,
  selectIsImageInQueue,
} from "../appImagesSlice";

import { FadeIn } from "@/styles/animations/FadeIn";

import { Image, BlankPlaceholder } from "./AppImage.styled";

type AppImageProps = {
  altText?: string;
  imageId?: string;
  placeholderSrc?: string;
  onClick?: () => void;
  className?: string;
};

const AppImage = ({
  altText,
  imageId,
  placeholderSrc = "/landscape-placeholder.png",
  onClick,
  className,
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

  const imgSrc =
    !imageId && !isLoading
      ? placeholderSrc
      : isLoading && !imageURL
        ? "/empty.png"
        : imageURL;

  if (!imageId)
    return (
      <Image
        onClick={onClick}
        initial={FadeIn.hidden}
        animate={FadeIn.visible}
        transition={FadeIn.transition}
        src={imgSrc}
        alt={altText}
        className={className}
      />
    );

  return isLoading ? (
    <BlankPlaceholder className={className} />
  ) : (
    <Image
      onClick={onClick}
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
      src={imgSrc}
      alt={altText}
      className={className}
    />
  );
};

export default AppImage;
