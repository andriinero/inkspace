import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import useBookmarkPostAction from '@/hooks/useBookmarkPostAction';
import useIgnoreUserAction from '@/hooks/useIgnoreUserAction';
import parse from 'html-react-parser';

import { selectAuthData, selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  selectFetchProfileDataState,
  selectBookmarkActionState,
  selectIsPostBookmarked,
  selectIsUserIgnored,
  selectIgnoreUserActionState,
} from '@/features/profile/profileSlice';
import { deletePost, setTopic } from '../../features/postList/postListSlice';
import { enterEditMode } from '@/features/postForm/postFormSlice';

import { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';
import { TopicData } from '@/types/entityData/TopicData';
import { Waterfall } from '@/styles/animations/Waterfall';

import PostDate from '@/components/general/TimeAgo';
import { Username } from '@/components/styled/Username.styled';
import { MenuItem, MenuItemDanger, MenuItemSuccess } from '@/components/styled/MenuItem';
import Dialog from '@/components/general/Dialog';
import DeleteConfirm from '@/components/general/DeleteConfirm';
import * as S from './PostItem.styled';

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

  const handleDeleteClick = (): void => {
    dispatch(deletePost(_id));
  };

  const handleIgnoreAction = useIgnoreUserAction(
    author._id,
    isIgnored,
    ignoreUserActionState.isLoading
  );

  const handleBookmarkClick = useBookmarkPostAction(
    _id,
    isBookmarked,
    bookmarkActionState.isLoading
  );
  const handleMuteAuthorClick = (): void => {
    handleIgnoreAction();
    setIsMenuOpen(false);
  };

  return (
    <S.Wrapper variants={Waterfall.item}>
      <S.Head>
        <S.StyledLink to={`/authors/${author._id}`}>
          <S.AuthorIcon imageId={author.profile_image} altText="Author Icon" />
        </S.StyledLink>
        <S.StyledLink to={`/authors/${author._id}`}>
          <Username>{author.username}</Username>
        </S.StyledLink>
        <S.Divider>·</S.Divider>
        <PostDate date={date} />
      </S.Head>
      <S.Body>
        <S.StyledLink to={`/posts/${_id}`}>
          <S.StyledTitle>{title}</S.StyledTitle>
        </S.StyledLink>
        <S.BodyText>{parse(body)}</S.BodyText>
      </S.Body>
      <S.PreviewImage imageId={thumbnail_image} altText="Post Image Preview" />
      <S.Bottom>
        <S.MiscContainer>
          {topic && <S.Topic onClick={handleTopicClick}>{topic.name}</S.Topic>}
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
                onToggle={handleMenuToggle}
                onMenuClose={handleMenuClose}
                isOpen={isMenuOpen}
                isAlignedLeft={false}
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
                  <>
                    <MenuItemDanger onClick={handleOpenDeleteModal}>
                      Delete Post
                    </MenuItemDanger>
                  </>
                )}
              </S.StyledDotMenu>
              <Dialog
                isModalOpen={isDeleteModalOpen}
                onModalClose={handleCloseDeleteModal}
              >
                <DeleteConfirm
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
