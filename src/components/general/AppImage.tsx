import useFetchImage from '@/hooks/useFetchImage';
import { Image, ImagePlaceholder } from './AppImage.styled';

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
    <Image className={className} src={imgSrc} alt={altText} />
  );
};

export default AppImage;
