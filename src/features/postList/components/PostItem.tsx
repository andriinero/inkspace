import { useRef, useState } from 'react';
import * as S from './PostItem.styled';
import PostDate from '@/components/general/PostDate';
import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';
import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';
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
        <S.PostLink to={`/authors/${author._id}`}>
          <S.AuthorIcon src="/portrait-placeholder.png" />
        </S.PostLink>
        <S.PostLink to={`/authors/${author._id}`}>
          <S.AuthorName>{author.username}</S.AuthorName>
        </S.PostLink>
        <S.Divider>·</S.Divider>
        <PostDate date={date} />
      </S.Head>
      <S.Body>
        <S.PostLink to={`/posts/${_id}`}>
          <S.Title>{title}</S.Title>
        </S.PostLink>
        <S.BodyText>{body}</S.BodyText>
      </S.Body>
      <S.Preview>
        <S.PreviewImage src="/landscape-placeholder.png" />
      </S.Preview>
      <S.Bottom>
        <S.MiscContainer>
          {topic && (
            <S.PostLink to={`/topics/${topic._id}`}>
              <S.Topic>{topic.name}</S.Topic>
            </S.PostLink>
          )}
          <S.PostReadEstimate bodyLength={body.length} />
        </S.MiscContainer>
        <S.Controls>
          {isAuthenticated && (
            <>
              <Bookmark onBookmarked={handleBookmarkToggle} isBookmarked={isBookmarked} />
              <DotMenu
                onToggle={handleMenuToggle}
                onMenuClose={handleMenuClose}
                isOpen={isMenuOpen}
              >
                <S.MenuItem onClick={handleMenuClose}>Mute this author</S.MenuItem>
                <S.MenuItem onClick={handleMenuClose}>Mute this publication</S.MenuItem>
              </DotMenu>
            </>
          )}
        </S.Controls>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default PostItem;
