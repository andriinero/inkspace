import { useAppSelector } from '@/app/hooks';
import * as S from './AuthorItem.styled';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

type AuthorItemProps = {
  _id: string;
  username: string;
  bio?: string;
};

// TODO: fix bio styling
const AuthorItem = ({ _id, username, bio }: AuthorItemProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const followLink = isAuthenticated ? `/authors/${_id}` : '/login';
  return (
    <S.WrapperItem>
      <S.StyledLink to={`/authors/${_id}`}>
        <S.Icon src="/portrait-placeholder.png" />
      </S.StyledLink>
      <S.BioContainer>
        <S.StyledLink to={`/authors/${_id}`}>
          <S.BioName> {username}</S.BioName>
        </S.StyledLink>
        <S.BioContent>{bio || 'No user bio'}</S.BioContent>
      </S.BioContainer>
      <S.StyledLink to={followLink}>
        <S.FollowButton type="button" value="Follow" />
      </S.StyledLink>
    </S.WrapperItem>
  );
};

export default AuthorItem;
