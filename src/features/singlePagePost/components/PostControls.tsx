import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { putLikeCount, selectPostLikeCount } from '../singlePagePostSlice';
import { toggleComments } from '@/features/commentList/commentListSlice';

import {
  ControlsContainer,
  ControlsIcon,
  LikeCount,
  LikeWrapper,
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
  const userBookmarks = useAppSelector(selectProfileBookmarks);
  const likeCount = useAppSelector(selectPostLikeCount);

  const postBookmarkState = useAppSelector(selectPostBookmarkState);
  const deleteBookmarkState = useAppSelector(selectDeleteBookmarkState);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const isBookmarked = userBookmarks?.some((p) => p === postId) || false;

  const onLikeClick = (): void => {
    dispatch(putLikeCount(postId));
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

  const handleDropdownToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownClose = (): void => {
    setIsMenuOpen(false);
  };

  const onBookmarkClick = isBookmarked ? handleBookmarkRemove : handleBookmarkAdd;

  return (
    <Wrapper>
      <ControlsContainer>
        <LikeWrapper>
          <ControlsIcon onClick={onLikeClick} src="/thumb-up-outline.svg" />
          <LikeCount>{likeCount ? likeCount : ''}</LikeCount>
        </LikeWrapper>
        <ControlsIcon onClick={onCommentsClick} src="/comment-outline.svg" />
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={onBookmarkClick} isBookmarked={isBookmarked} />
        <DotMenu
          isAlignedLeft={false}
          onToggle={handleDropdownToggle}
          onMenuClose={handleDropdownClose}
          isOpen={isMenuOpen}
        >
          <MenuItem onClick={handleDropdownClose}>Mute this author</MenuItem>
          <MenuItem onClick={handleDropdownClose}>Mute this publication</MenuItem>
        </DotMenu>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
