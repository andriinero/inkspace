import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectCurrentUserId } from '@/features/auth/authSlice';
import { deleteComment } from '../commentListSlice';
import {
  enterEditMode,
  selectCommentIsEditMode,
} from '@/features/commentEditor/commentEditorSlice';

import type { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';

import * as S from './CommentItem.styled';
import Dialog from '@/components/general/Dialog';
import DeleteConfirmFormForm from '@/components/general/DeleteConfirmForm';
import { MenuItemDanger, MenuItemSuccess } from '@/components/styled/MenuItem';

type CommentProps = {
  _id: string;
  post: string;
  author: GeneralAuthorData;
  body: string;
  date: string;
  edit_date?: string;
};

const CommentItem = ({ _id, author, body, date, edit_date }: CommentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const currentUserId = useAppSelector(selectCurrentUserId);
  const isEditMode = useAppSelector(selectCommentIsEditMode);

  const dispatch = useAppDispatch();

  const handleCloseMenu = (): void => {
    setIsMenuOpen(false);
  };

  const handleToggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClick = (): void => {
    dispatch(deleteComment(_id));
  };

  const handleEditClick = (): void => {
    dispatch(enterEditMode({ commentId: _id, commentBody: body }));
    setIsMenuOpen(false);
  };

  const isAuthor = currentUserId === author._id;

  return (
    <S.Wrapper>
      <S.Header>
        <S.WrapperAuthor>
          <S.AuthorIcon
            imageId={author.profile_image}
            placeholderSrc="/portrait-placeholder.png"
            altText="Author Icon"
          />
          <S.WrapperInfo>
            <S.StyledLink to={`/authors/${author._id}`}>
              <S.StyledUsername>{author.username}</S.StyledUsername>
            </S.StyledLink>
            <S.CommentDate date={date} />
          </S.WrapperInfo>
        </S.WrapperAuthor>
        {isAuthor && !isEditMode && (
          <S.ControlsWrapper>
            <S.StyledDotMenu
              onMenuClose={handleCloseMenu}
              onToggle={handleToggleMenu}
              isOpen={isMenuOpen}
            >
              <MenuItemSuccess onClick={handleEditClick}>Edit</MenuItemSuccess>
              <MenuItemDanger onClick={handleOpenDeleteModal}>
                Delete
              </MenuItemDanger>
            </S.StyledDotMenu>
            <Dialog
              isModalOpen={isDeleteModalOpen}
              onModalClose={handleCloseDeleteModal}
            >
              <DeleteConfirmFormForm
                headerText="Are you sure you want to delete this comment?"
                onCancel={handleCloseDeleteModal}
                onDelete={handleDeleteClick}
              />
            </Dialog>
          </S.ControlsWrapper>
        )}
      </S.Header>
      <S.Body>{body}</S.Body>
      {edit_date && <S.EditDate date={edit_date}>last edit: </S.EditDate>}
    </S.Wrapper>
  );
};

export default CommentItem;
