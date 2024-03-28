import { Icon } from '../icons/AppIcon.styled';
import { Wrapper } from './JumpButton.styled';

const JumpButton = () => {
  const handleIconClick = (): void => {
    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <Icon onClick={handleIconClick} src="/up-arrow.svg" alt="Jump To Top Icon" />
    </Wrapper>
  );
};

export default JumpButton;
