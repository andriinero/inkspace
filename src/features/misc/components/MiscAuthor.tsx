import { Author } from '@/types/Author';

import * as S from './MiscAuthor.styled';

const MiscAuthor = ({ _id, username, email }: Author) => {
  return (
    <S.AuthorItem>
      <S.Icon src="/portrait-placeholder.png" />
      <S.Name>{username}</S.Name>
      <S.FollowButton type="button" value="Follow" />
    </S.AuthorItem>
  );
};

export default MiscAuthor;
