import { PopOut } from '@/styles/animations/PopOut';

import { Icon } from '../icons/AppIcon.styled';
import { Wrapper } from './JumpButton.styled';

type JumpButtonProps = {
  className?: string;
};

const JumpButton = ({ className }: JumpButtonProps) => {
  const handleIconClick = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Wrapper
      initial={PopOut.hidden}
      animate={PopOut.visible}
      transition={PopOut.transition}
      exit={PopOut.hidden}
    >
      <Icon
        className={className}
        onClick={handleIconClick}
        src="/up-arrow.svg"
        alt="Jump To Top Icon"
      />
    </Wrapper>
  );
};

export default JumpButton;
