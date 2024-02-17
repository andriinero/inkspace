import * as S from './AuthorItem.styled';

type AuthorItemProps = {
  _id: string;
  username: string;
  email: string;
};

const AuthorItem = ({ _id, username, email }: AuthorItemProps) => {
  return (
    <S.AuthorItem>
      <S.Icon src="/portrait-placeholder.png" />
      <S.Name>{username}</S.Name>
      <S.FollowButton type="button" value="Follow" />
    </S.AuthorItem>
  );
};

export default AuthorItem;
