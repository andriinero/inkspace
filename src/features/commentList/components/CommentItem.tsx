import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { PostAuthorData } from '@/types/entityData/GeneralAuthorData';

import { selectCurrentUserId } from '@/features/auth/authSlice';
import { deleteComment } from '../commentListSlice';
import {
  enterEditMode,
  selectCommentIsEditMode,
} from '@/features/commentEditor/commentEditorSlice';

import * as S from './CommentItem.styled';
import Dialog from '@/components/general/Dialog';
import DeleteConfirm from '@/components/general/DeleteConfirm';
import { MenuItemDanger, MenuItemSuccess } from '@/components/styled/MenuItem';

type CommentProps = {
  _id: string;
  post: string;
  author: PostAuthorData;
  body: string;
  date: string;
  edit_date?: string;
};

const CommentItem = ({ _id, post, author, body, date, edit_date }: CommentProps) => {
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

  const ownedByUser = currentUserId === author._id;

  return (
    <S.Wrapper>
      <S.Header>
        <S.WrapperAuthor>
          <S.AuthorIcon imageId={author.profile_image} altText="Author Icon" />
          <S.WrapperInfo>
            <S.StyledLink to={`/authors/${author._id}`}>
              <S.StyledUsername>{author.username}</S.StyledUsername>
            </S.StyledLink>
            <S.CommentDate date={date} />
          </S.WrapperInfo>
        </S.WrapperAuthor>
        {ownedByUser && !isEditMode && (
          <S.ControlsWrapper>
            <S.StyledDotMenu
              onMenuClose={handleCloseMenu}
              onToggle={handleToggleMenu}
              isOpen={isMenuOpen}
              isAlignedLeft={true}
            >
              <MenuItemSuccess onClick={handleEditClick}>
                Edit
                <S.EditIcon src="/edit.svg" alt="Edit Comment Icon" />
              </MenuItemSuccess>
              <MenuItemDanger onClick={handleOpenDeleteModal}>
                Delete
                <S.ControlsIcon src="/delete.svg" alt="Delete Comment Icon" />
              </MenuItemDanger>
            </S.StyledDotMenu>
            <Dialog isModalOpen={isDeleteModalOpen} onModalClose={handleCloseDeleteModal}>
              <DeleteConfirm
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
