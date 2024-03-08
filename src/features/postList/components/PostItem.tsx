import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import parse from 'html-react-parser';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  deleteBookmark,
  postBookmark,
  selectDeleteBookmarkState,
  selectFetchProfileDataState,
  selectPostBookmarkState,
} from '@/features/profile/profileSlice';

import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';

import * as S from './PostItem.styled';
import PostDate from '@/components/general/TimeAgo';
import { setTopic } from '../postListSlice';
import UserName from '@/components/general/UserName';
import Title from '@/components/general/Title';

type PostItemProps = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
  isBookmarked: boolean;
};

const PostItem = ({
  _id,
  author,
  title,
  body,
  date,
  topic,
  isBookmarked,
}: PostItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const fetchProfileState = useAppSelector(selectFetchProfileDataState);
  const postBookmarkState = useAppSelector(selectPostBookmarkState);
  const deleteBookmarkState = useAppSelector(selectDeleteBookmarkState);

  const dispatch = useAppDispatch();

  const handleBookmarkAdd = (): void => {
    if (!postBookmarkState.isLoading) dispatch(postBookmark(_id));
  };

  const handleBookmarkRemove = (): void => {
    if (!deleteBookmarkState.isLoading) dispatch(deleteBookmark(_id));
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
    <S.Wrapper>
      <S.Head>
        <S.StyledLink to={`/authors/${author._id}`}>
          <S.AuthorIcon src="/portrait-placeholder.png" />
        </S.StyledLink>
        <S.StyledLink to={`/authors/${author._id}`}>
          <UserName>{author.username}</UserName>
        </S.StyledLink>
        <S.Divider>·</S.Divider>
        <PostDate date={date} />
      </S.Head>
      <S.Body>
        <S.StyledLink to={`/posts/${_id}`}>
          <Title>{title}</Title>
        </S.StyledLink>
        <S.BodyText>{parse(body)}</S.BodyText>
      </S.Body>
      <S.Preview>
        <S.PreviewImage src="/landscape-placeholder.png" />
      </S.Preview>
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
