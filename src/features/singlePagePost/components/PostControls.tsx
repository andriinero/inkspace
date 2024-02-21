import { useState } from 'react';
import {
  ControlsContainer,
  ControlsIcon,
  MenuItem,
  Wrapper,
} from './PostControls.styled';
import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';

type PostControlsProps = {
  onLikedToggle: () => void;
  onCommentsToggle: () => void;
  onBookmarkedToggle: () => void;
  isLiked: boolean;
  isBookmarked: boolean;
};

const PostControls = ({
  onLikedToggle,
  onCommentsToggle,
  onBookmarkedToggle,
  isLiked,
  isBookmarked,
}: PostControlsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const likeSrc = isLiked ? '/thumb-up.svg' : '/thumb-up-outline.svg';

  return (
    <Wrapper>
      <ControlsContainer>
        <ControlsIcon onClick={onLikedToggle} src={likeSrc} />
        <ControlsIcon onClick={onCommentsToggle} src="/comment-outline.svg" />
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={onBookmarkedToggle} isBookmarked={isBookmarked} />
        <DotMenu onToggle={handleMenuToggle} isOpen={isMenuOpen}>
          <MenuItem onClick={handleMenuToggle}>Mute this author</MenuItem>
          <MenuItem onClick={handleMenuToggle}>Mute this publication</MenuItem>
        </DotMenu>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
