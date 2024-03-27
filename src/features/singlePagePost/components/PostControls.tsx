import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';

import { putLikeCount, selectPostLikeCount } from '../singlePagePostSlice';
import { toggleComments } from '@/features/commentList/commentListSlice';
import {
  deleteBookmark,
  postBookmark,
  selectBookmarkActionState,
  selectProfileBookmarks,
} from '@/features/profile/profileSlice';
import { enterEditMode } from '@/features/postForm/postFormSlice';

import Bookmark from '@/components/icons/Bookmark';
import DotMenu from '@/components/general/DotMenu';
import { MenuItem, MenuItemDanger, MenuItemSuccess } from '@/components/styled/MenuItem';
import {
  ControlsContainer,
  ControlsIcon,
  LikeCount,
  LikeWrapper,
  Wrapper,
} from './PostControls.styled';
import { deletePost } from '@/features/postList/postListSlice';

type PostControlsProps = { postId: string; isAuthor: boolean };

const PostControls = ({ postId, isAuthor }: PostControlsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const likeCount = useAppSelector(selectPostLikeCount);
  const userBookmarks = useAppSelector(selectProfileBookmarks);
  const bookmarkActionState = useAppSelector(selectBookmarkActionState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLikeClick = (): void => {
    dispatch(putLikeCount(postId));
  };

  const handleBookmarkAdd = (): void => {
    if (!bookmarkActionState.isLoading) dispatch(postBookmark(postId));
  };

  const handleBookmarkRemove = (): void => {
    if (!bookmarkActionState.isLoading) dispatch(deleteBookmark(postId));
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

  const handleEditModeClick = (): void => {
    dispatch(enterEditMode(postId));
    setIsMenuOpen(false);
    navigate('/post-form');
  };

  const handleDeleteClick = async (): Promise<void> => {
    const response = await dispatch(deletePost(postId)).unwrap();

    if (response) navigate('/');
  };

  const handleMuteAuthorClick = (): void => {
    // TODO:
    setIsMenuOpen(false);
  };

  const isBookmarked = userBookmarks?.some((p) => p === postId) || false;
  const onBookmarkClick = isBookmarked ? handleBookmarkRemove : handleBookmarkAdd;

  return (
    <Wrapper>
      <ControlsContainer>
        <LikeWrapper>
          <ControlsIcon
            onIconClick={onLikeClick}
            src="/thumb-up-outline.svg"
            alt="Like Icon"
          />
          <LikeCount>{likeCount ? likeCount : ''}</LikeCount>
        </LikeWrapper>
        <ControlsIcon
          onIconClick={onCommentsClick}
          src="/comment-outline.svg"
          alt="Toggle Comments Icon"
        />
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={onBookmarkClick} isBookmarked={isBookmarked} />
        <DotMenu
          isAlignedLeft={false}
          onToggle={handleDropdownToggle}
          onMenuClose={handleDropdownClose}
          isOpen={isMenuOpen}
        >
          {isAuthor && (
            <MenuItemSuccess onClick={handleEditModeClick}>Edit Post</MenuItemSuccess>
          )}
          <MenuItem onClick={handleMuteAuthorClick}>Mute this author</MenuItem>
          {isAuthor && (
            <MenuItemDanger onClick={handleDeleteClick}>Delete Post</MenuItemDanger>
          )}
        </DotMenu>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
