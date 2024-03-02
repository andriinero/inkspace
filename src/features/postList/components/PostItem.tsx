import { useState } from 'react';
import parse from 'html-react-parser';
import * as S from './PostItem.styled';
import PostDate from '@/components/general/PostDate';
import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';
import { useAppSelector } from '@/app/hooks';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

type PostItemProps = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
};

const PostItem = ({ _id, author, title, body, date, topic }: PostItemProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleBookmarkToggle = (): void => {
    setIsBookmarked(!isBookmarked);
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <S.Wrapper>
      <S.Head>
        <S.StyledLink to={`/authors/${author._id}`}>
          <S.AuthorIcon src="/portrait-placeholder.png" />
        </S.StyledLink>
        <S.StyledLink to={`/authors/${author._id}`}>
          <S.AuthorName>{author.username}</S.AuthorName>
        </S.StyledLink>
        <S.Divider>·</S.Divider>
        <PostDate date={date} />
      </S.Head>
      <S.Body>
        <S.StyledLink to={`/posts/${_id}`}>
          <S.Title>{title}</S.Title>
        </S.StyledLink>
        <S.BodyText>{parse(body)}</S.BodyText>
      </S.Body>
      <S.Preview>
        <S.PreviewImage src="/landscape-placeholder.png" />
      </S.Preview>
      <S.Bottom>
        <S.MiscContainer>
          {topic && (
            <S.StyledLink to={`/topics/${topic._id}`}>
              <S.Topic>{topic.name}</S.Topic>
            </S.StyledLink>
          )}
          <S.PostReadEstimate bodyLength={body.length} />
        </S.MiscContainer>
        <S.Controls>
          {isAuthenticated && (
            <>
              {/* TODO: refactor handlers */}
              <S.StyledBookmark
                onBookmarked={handleBookmarkToggle}
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
