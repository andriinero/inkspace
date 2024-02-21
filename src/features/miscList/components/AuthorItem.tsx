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
        <S.AuthorLink to={`/authors/${_id}`}>
          <S.BioName> {username}</S.BioName>
        </S.AuthorLink>
        <S.BioContent>{bio}</S.BioContent>
      </S.BioContainer>
      <S.FollowButton type="button" value="Follow" />
    </S.WrapperItem>
  );
};

export default AuthorItem;
