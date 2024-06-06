import { PopOut } from '@/styles/animations/PopOut';

import { Wrapper } from './JumpButton.styled';
import AppIcon from './AppIcon';
import { BsChevronUp } from 'react-icons/bs';

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
      <AppIcon className={className} onClick={handleIconClick}>
        <BsChevronUp />
      </AppIcon>
    </Wrapper>
  );
};

export default JumpButton;
