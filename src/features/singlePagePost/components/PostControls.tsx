import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  selectIsPostBookmarked,
  selectIsPostLiked,
  toggleIsBookmarked,
  toggleIsCommentsOpen,
  toggleIsLiked,
} from '../singlePagePostSlice';

import {
  ControlsContainer,
  ControlsIcon,
  MenuItem,
  Wrapper,
} from './PostControls.styled';
import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';

const PostControls = () => {
  const isLiked = useAppSelector(selectIsPostLiked);
  const isBookmarked = useAppSelector(selectIsPostBookmarked);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onLikeClick = (): void => {
    dispatch(toggleIsLiked());
  };

  const onCommentsClick = (): void => {
    dispatch(toggleIsCommentsOpen());
  };

  const onBookmarkClick = (): void => {
    dispatch(toggleIsBookmarked());
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  const likeSrc = isLiked ? '/thumb-up.svg' : '/thumb-up-outline.svg';

  return (
    <Wrapper>
      <ControlsContainer>
        <ControlsIcon onClick={onLikeClick} src={likeSrc} />
        <ControlsIcon onClick={onCommentsClick} src="/comment-outline.svg" />
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={onBookmarkClick} isBookmarked={isBookmarked} />
        <DotMenu
          onToggle={handleMenuToggle}
          onMenuClose={handleMenuClose}
          isOpen={isMenuOpen}
        >
          <MenuItem onClick={handleMenuClose}>Mute this author</MenuItem>
          <MenuItem onClick={handleMenuClose}>Mute this publication</MenuItem>
        </DotMenu>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
