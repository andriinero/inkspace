import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import parse from 'html-react-parser';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  deleteBookmark,
  postBookmark,
  selectFetchProfileDataState,
  selectBookmarkActionState,
} from '@/features/profile/profileSlice';
import { setTopic } from '../postListSlice';

import { PostAuthorData } from '@/types/itemData/GeneralAuthorData';
import { TopicData } from '@/types/itemData/TopicData';

import * as S from './PostItem.styled';
import PostDate from '@/components/general/TimeAgo';
import { Waterfall } from '@/styles/animations/Waterfall';
import { Username } from '@/styles/components/Username.styled';

type PostItemProps = {
  _id: string;
  author: PostAuthorData;
  title: string;
  body: string;
  date: string;
  topic: TopicData;
  thumbnail_image?: string;
  isBookmarked: boolean;
};

const PostItem = ({
  _id,
  author,
  title,
  body,
  date,
  topic,
  thumbnail_image,
  isBookmarked,
}: PostItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const fetchProfileState = useAppSelector(selectFetchProfileDataState);
  const bookmarkActionState = useAppSelector(selectBookmarkActionState);

  const dispatch = useAppDispatch();

  const handleBookmarkAdd = (): void => {
    if (!bookmarkActionState.isLoading) dispatch(postBookmark(_id));
  };

  const handleBookmarkRemove = (): void => {
    if (!bookmarkActionState.isLoading) dispatch(deleteBookmark(_id));
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  const handleTopicClick = (): void => {
    dispatch(setTopic(topic));
  };

  const handleBookmarkClick = isBookmarked ? handleBookmarkRemove : handleBookmarkAdd;

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
                <S.MenuItem onClick={handleMenuClose}>Mute this author</S.MenuItem>
                <S.MenuItem onClick={handleMenuClose}>Mute this publication</S.MenuItem>
              </S.StyledDotMenu>
            </>
          )}
        </S.Controls>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default PostItem;
