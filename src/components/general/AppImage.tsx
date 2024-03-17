import useFetchImage from '@/hooks/useFetchImage';
import { Image, ImagePlaceholder } from './AppImage.styled';
import { FadeIn } from '@/styles/animations/FadeIn';

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
  const { imageURL, isLoading, error } = useFetchImage(imageId);

  const imgSrc = error ? placeholderSrc : imageURL;

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
