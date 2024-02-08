import { DateTime } from 'luxon';

import Post from '@/types/Post';

import * as S from './PostItem.styled';

const PostItem = ({ author, title, body, date }: Post) => {
  return (
    <S.Wrapper>
      <S.Head>
        <S.AuthorPfp src='/portrait-placeholder.png'/>
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
    </S.Wrapper>
  );
};

export default PostItem;
