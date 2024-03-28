import { Icon } from './AppIcon.styled';

type AppIconProps = {
  className?: string;
  src?: string;
  alt: string;
  onIconClick?: () => void;
};

const AppIcon = ({ className, src, onIconClick }: AppIconProps) => {
  return <Icon className={className} onClick={onIconClick} src={src} />;
};

export default AppIcon;
