import { useState } from 'react';
import * as S from './PostItem.styled';
import Dropdown from './Dropdown';
import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';
import PostReadTime from '@/components/general/PostReadTime';
import PostDate from '@/components/general/PostDate';

type PostItemProps = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
};

const PostItem = ({ _id, author, title, body, date, topic }: PostItemProps) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleBookmarkToggle = (): void => {
    setIsBookmarked(!isBookmarked);
  };

  const handleMoreToggle = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const bookmarkSrc = isBookmarked ? '/bookmark.svg' : '/bookmark-outline.svg';

  return (
    <S.Wrapper>
      <S.Head>
        <S.AuthorPfp src="/portrait-placeholder.png" />
        <S.AuthorName>{author.username}</S.AuthorName>
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
          {topic && <S.Topic>{topic.name}</S.Topic>}
          <PostReadTime bodyLength={body.length} />
        </S.MiscContainer>
        <S.Controls>
          <S.ControlsIcon onClick={handleBookmarkToggle} src={bookmarkSrc} />
          <S.ControlsIcon onClick={handleMoreToggle} src="/dots-horizontal.svg" />
          <Dropdown isOpen={isDropdownOpen} />
        </S.Controls>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default PostItem;
