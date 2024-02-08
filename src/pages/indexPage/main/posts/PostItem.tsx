import { DateTime } from 'luxon';

import { CHARACTERS_PER_MINUTE } from '@/data/consts';
import Post from '@/types/Post';

import * as S from './PostItem.styled';
import { useState } from 'react';

const PostItem = ({ author, title, body, date, topic }: Post) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);

  const handleBookmarkToggle = (): void => {
    setIsBookmarked(!isBookmarked);
  };

  const handleMoreToggle = (): void => {
    setIsMoreOpen(!isMoreOpen);
  };

  const timeToRead: number = Math.trunc(Math.round(body.length / CHARACTERS_PER_MINUTE));
  const timeEstimate: string = timeToRead < 1 ? '<1' : timeToRead.toString();

  return (
    <S.Wrapper>
      <S.Head>
        <S.AuthorPfp src="/portrait-placeholder.png" />
        <S.AuthorName>{author.username}</S.AuthorName>
        <S.Divider>·</S.Divider>
        <S.Date>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</S.Date>
      </S.Head>
      <S.Body>
        <S.Title>{title}</S.Title>
        <S.BodyText>{body}</S.BodyText>
      </S.Body>
      <S.Preview>
        <S.PreviewImage src="/landscape-placeholder.png" />
      </S.Preview>
      <S.Bottom>
        <S.MiscContainer>
          <S.Topic>{topic}</S.Topic>
          <S.TimeEstimate>{timeEstimate} min read</S.TimeEstimate>
        </S.MiscContainer>
        <S.Controls>
          <S.ControlsIcon onClick={handleBookmarkToggle} src="/bookmark-outline.svg" />
          <S.ControlsIcon onClick={handleMoreToggle} src="/dots-horizontal.svg" />
        </S.Controls>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default PostItem;
