import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  selectIsPostBookmarked,
  selectIsPostLiked,
  toggleIsBookmarked,
  toggleIsLiked,
} from '../singlePagePostSlice';
import { toggleComments } from '@/features/commentList/commentListSlice';

import {
  ControlsContainer,
  ControlsIcon,
  MenuItem,
  Wrapper,
} from './PostControls.styled';
import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';
import {
  deleteBookmark,
  postBookmark,
  selectDeleteBookmarkState,
  selectPostBookmarkState,
  selectProfileBookmarks,
} from '@/features/profile/profileSlice';

type PostControlsProps = { postId: string };

const PostControls = ({ postId }: PostControlsProps) => {
  const isLiked = useAppSelector(selectIsPostLiked);

  const userBookmarks = useAppSelector(selectProfileBookmarks);

  const postBookmarkState = useAppSelector(selectPostBookmarkState);
  const deleteBookmarkState = useAppSelector(selectDeleteBookmarkState);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const isBookmarked = userBookmarks?.some((p) => p === postId) || false;

  const onLikeClick = (): void => {
    dispatch(toggleIsLiked());
  };

  const handleBookmarkAdd = (): void => {
    if (!postBookmarkState.isLoading) dispatch(postBookmark(postId));
  };

  const handleBookmarkRemove = (): void => {
    if (!deleteBookmarkState.isLoading) dispatch(deleteBookmark(postId));
  };

  const onCommentsClick = (): void => {
    dispatch(toggleComments());
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  const likeSrc = isLiked ? '/thumb-up.svg' : '/thumb-up-outline.svg';

  const onBookmarkClick = isBookmarked ? handleBookmarkRemove : handleBookmarkAdd;

  return (
    <Wrapper>
      <ControlsContainer>
        <ControlsIcon onClick={onLikeClick} src={likeSrc} />
        <ControlsIcon onClick={onCommentsClick} src="/comment-outline.svg" />
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={onBookmarkClick} isBookmarked={isBookmarked} />
        <DotMenu
          isAlignedLeft={false}
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
