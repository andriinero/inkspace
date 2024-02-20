import * as S from './AuthorItem.styled';

type AuthorItemProps = {
  _id: string;
  username: string;
  bio?: string;
};

const AuthorItem = ({ _id, username, bio }: AuthorItemProps) => {
  return (
    <S.WrapperItem>
      <S.Icon src="/portrait-placeholder.png" />
      <S.BioContainer>
        <S.BioName>{username}</S.BioName>
        <S.BioContent>{bio}</S.BioContent>
      </S.BioContainer>
      <S.FollowButton type="button" value="Follow" />
    </S.WrapperItem>
  );
};

export default AuthorItem;
