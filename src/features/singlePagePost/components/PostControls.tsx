import { useState } from 'react';
import {
  ControlsContainer,
  ControlsIcon,
  MenuItem,
  Wrapper,
} from './PostControls.styled';
import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';

const PostControls = () => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

  const handleBookmarkToggle = (): void => {
    setIsBookmarked(!isBookmarked);
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLikeToggle = (): void => {
    setIsLiked(!isLiked);
  };

  const handleCommentsToggle = (): void => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  const likeSrc = isLiked ? '/thumb-up.svg' : '/thumb-up-outline.svg';

  return (
    <Wrapper>
      <ControlsContainer>
        <ControlsIcon onClick={handleLikeToggle} src={likeSrc} />
        <ControlsIcon onClick={handleCommentsToggle} src="/comment-outline.svg" />
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={handleBookmarkToggle} isBookmarked={isBookmarked} />
        <DotMenu onToggle={handleMenuToggle} isOpen={isMenuOpen}>
          <MenuItem onClick={handleMenuToggle}>Mute this author</MenuItem>
          <MenuItem onClick={handleMenuToggle}>Mute this publication</MenuItem>
        </DotMenu>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
