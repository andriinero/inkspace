import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useBookmarkPostAction from '@/hooks/useBookmarkPostAction';
import useIgnoreUserAction from '@/hooks/useIgnoreUserAction';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  selectAuthData,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import { enterEditMode } from '@/features/postForm/postFormSlice';
import {
  selectBookmarkActionState,
  selectFetchProfileDataState,
  selectIgnoreUserActionState,
  selectIsPostBookmarked,
  selectIsUserIgnored,
} from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';
import { deletePost, setTopic } from '../../features/postList/postListSlice';

import { Waterfall } from '@/styles/animations/Waterfall';
import { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { TopicData } from '@/types/entityData/TopicData';

import DeleteConfirmFormForm from '@/components/general/DeleteConfirmForm';
import Dialog from '@/components/general/Dialog';
import * as S from './PostItem.styled';
import PostItemHead from './PostItemHead';

type PostItemProps = {
  _id: string;
  author: GeneralAuthorData;
  title: string;
  body: string;
  date: string;
  topic: TopicData;
  thumbnail_image?: string;
};

const PostItem = ({
  _id,
  author,
  title,
  body,
  date,
  topic,
  thumbnail_image,
}: PostItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isBookmarked = useAppSelector(selectIsPostBookmarked(_id)) as boolean;
  const isIgnored = useAppSelector(selectIsUserIgnored(author._id)) as boolean;

  const authData = useAppSelector(selectAuthData);

  const fetchProfileState = useAppSelector(selectFetchProfileDataState);
  const bookmarkActionState = useAppSelector(selectBookmarkActionState);
  const ignoreUserActionState = useAppSelector(selectIgnoreUserActionState);

  const isAuthor = authData?.sub === author._id;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  const handleTopicClick = (): void => {
    dispatch(setTopic(topic));
  };

  const handleEditModeClick = (): void => {
    dispatch(enterEditMode(_id));
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
    const response = await dispatch(deletePost(_id)).unwrap();

    if (response) {
      dispatch(
        addPushNotification(
          'post deleted successfully',
          PushNotificationType.SUCCESS,
        ),
      );
    }
  };

  const handleIgnoreAction = useIgnoreUserAction(
    author._id,
    isIgnored,
    ignoreUserActionState.isLoading,
  );

  const handleBookmarkClick = useBookmarkPostAction(
    _id,
    isBookmarked,
    bookmarkActionState.isLoading,
  );
  const handleMuteAuthorClick = (): void => {
    handleIgnoreAction();
    setIsMenuOpen(false);
  };

  return (
    <S.Wrapper variants={Waterfall.item}>
      <PostItemHead author={author} postDate={date} />
      <S.Body>
        <S.StyledLink to={`/posts/${_id}`}>
          <S.StyledTitle>{title}</S.StyledTitle>
        </S.StyledLink>
        <S.BodyText>{parse(body)}</S.BodyText>
      </S.Body>
      <S.PreviewImage imageId={thumbnail_image} altText="Post Image Preview" />
      <S.Bottom>
        <S.MiscContainer>
          {topic && (
            <S.Topic onTopicClick={handleTopicClick}>{topic.name}</S.Topic>
          )}
          <S.PostReadEstimate bodyLength={body.length} />
        </S.MiscContainer>
        <S.Controls>
          {isAuthenticated && !fetchProfileState.isLoading && (
            <>
              <S.StyledBookmark
                onBookmarked={handleBookmarkClick}
                isBookmarked={isBookmarked}
              />
              <S.StyledDotMenu
                isAlignedLeft
                isOpen={isMenuOpen}
                onToggle={handleMenuToggle}
                onMenuClose={handleMenuClose}
              >
                {isAuthor && (
                  <S.StyledMenuItemSuccess onClick={handleEditModeClick}>
                    Edit Post
                  </S.StyledMenuItemSuccess>
                )}
                {!isAuthor && (
                  <S.StyledMenuItem onClick={handleMuteAuthorClick}>
                    {isIgnored ? 'Unmute this author' : 'Mute this author'}
                  </S.StyledMenuItem>
                )}
                {isAuthor && (
                  <S.StyledMenuItemDanger onClick={handleOpenDeleteModal}>
                    Delete Post
                  </S.StyledMenuItemDanger>
                )}
              </S.StyledDotMenu>
              <Dialog
                isModalOpen={isDeleteModalOpen}
                onModalClose={handleCloseDeleteModal}
              >
                <DeleteConfirmFormForm
                  headerText="Are you sure you want to delete this post?"
                  onCancel={handleCloseDeleteModal}
                  onDelete={handleDeleteClick}
                />
              </Dialog>
            </>
          )}
        </S.Controls>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default PostItem;
