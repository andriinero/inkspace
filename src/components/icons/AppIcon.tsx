import { WrapperIcon } from './AppIcon.styled';

type AppIconProps = {
  className?: string;
  src?: string;
  alt: string;
  onIconClick?: () => void;
};

const AppIcon = ({ className, src, onIconClick }: AppIconProps) => {
  return <WrapperIcon className={className} onClick={onIconClick} src={src} />;
};

export default AppIcon;
