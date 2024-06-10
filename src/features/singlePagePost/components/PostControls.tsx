import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import useBookmarkPostAction from '@/hooks/useBookmarkPostAction';

import {
  putLikeCount,
  selectCurrentPostAuthor,
  selectPostLikeCount,
} from '../singlePagePostSlice';
import { toggleComments } from '@/features/commentList/commentListSlice';
import {
  deleteIgnoredUser,
  postIgnoredUser,
  selectBookmarkActionState,
  selectIsPostBookmarked,
  selectIsUserIgnored,
} from '@/features/profile/profileSlice';
import { deletePost } from '@/features/postList/postListSlice';
import { enterEditMode } from '@/features/postForm/postFormSlice';

import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';
import {
  MenuItem,
  MenuItemDanger,
  MenuItemSuccess,
} from '@/components/styled/MenuItem';
import {
  ControlsContainer,
  LikeCount,
  LikeWrapper,
  Wrapper,
} from './PostControls.styled';
import Dialog from '@/components/general/Dialog';
import AppIcon from '@/components/general/AppIcon';
import { BsChat, BsHandThumbsUp } from 'react-icons/bs';
import DeleteConfirmForm from '@/components/general/DeleteConfirmForm';

type PostControlsProps = { postId: string; isAuthor: boolean };

const PostControls = ({ postId, isAuthor }: PostControlsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const author = useAppSelector(selectCurrentPostAuthor)!;

  const isIgnored = useAppSelector(selectIsUserIgnored(author._id));
  const isBookmarked = useAppSelector(
    selectIsPostBookmarked(postId),
  ) as boolean;
  const likeCount = useAppSelector(selectPostLikeCount);
  const bookmarkActionState = useAppSelector(selectBookmarkActionState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLikeClick = (): void => {
    dispatch(putLikeCount(postId));
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

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClick = async (): Promise<void> => {
    const response = await dispatch(deletePost(postId)).unwrap();

    if (response) navigate('/');
  };

  const handleMuteAuthor = (): void => {
    dispatch(postIgnoredUser(author._id));
    setIsMenuOpen(false);
  };

  const handleUnmuteAuthor = (): void => {
    dispatch(deleteIgnoredUser(author._id));
    setIsMenuOpen(false);
  };

  const onBookmarkClick = useBookmarkPostAction(
    postId,
    isBookmarked,
    bookmarkActionState.isLoading,
  );
  const handleMuteAuthorClick = isIgnored
    ? handleUnmuteAuthor
    : handleMuteAuthor;

  return (
    <Wrapper>
      <ControlsContainer>
        <LikeWrapper>
          <AppIcon onClick={onLikeClick}>
            <BsHandThumbsUp />
          </AppIcon>
          <LikeCount>{likeCount ? likeCount : ''}</LikeCount>
        </LikeWrapper>
        <AppIcon onClick={onCommentsClick}>
          <BsChat />
        </AppIcon>
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={onBookmarkClick} isBookmarked={isBookmarked} />
        <DotMenu
          isAlignedLeft={true}
          onToggle={handleDropdownToggle}
          onMenuClose={handleDropdownClose}
          isOpen={isMenuOpen}
        >
          {isAuthor && (
            <MenuItemSuccess onClick={handleEditModeClick}>
              Edit Post
            </MenuItemSuccess>
          )}
          {!isAuthor && (
            <MenuItem onClick={handleMuteAuthorClick}>
              {isIgnored ? 'Unmute this author' : 'Mute this author'}
            </MenuItem>
          )}
          {isAuthor && (
            <MenuItemDanger onClick={handleOpenDeleteModal}>
              Delete Post
            </MenuItemDanger>
          )}
        </DotMenu>
        <Dialog
          isModalOpen={isDeleteModalOpen}
          onModalClose={handleCloseDeleteModal}
        >
          <DeleteConfirmForm
            headerText="Are you sure you want to delete this post?"
            onCancel={handleCloseDeleteModal}
            onDelete={handleDeleteClick}
          />
        </Dialog>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
