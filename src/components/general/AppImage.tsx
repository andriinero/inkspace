import useFetchImage from '@/hooks/useFetchImage';
import { Image, ImagePlaceholder } from './AppImage.styled';

type AppImageProps = { className?: string; altText?: string; imageId: string };

const AppImage = ({ className, altText, imageId }: AppImageProps) => {
  const { imageURL, isLoading, error } = useFetchImage(imageId);

  const imgSrc = error ? '/portrait-placeholder.png' : imageURL;

  return isLoading ? (
    <ImagePlaceholder className={className} />
  ) : (
    <Image className={className} src={imgSrc} alt={altText} />
  );
};

export default AppImage;
