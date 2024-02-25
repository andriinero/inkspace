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
      <S.AuthorLink to={`/authors/${_id}`}>
        <S.Icon src="/portrait-placeholder.png" />
      </S.AuthorLink>
      <S.BioContainer>
        <S.AuthorLink to={`/authors/${_id}`}>
          <S.BioName> {username}</S.BioName>
        </S.AuthorLink>
        <S.BioContent>{bio || 'No user bio'}</S.BioContent>
      </S.BioContainer>
      <S.AuthorLink to={followLink}>
        <S.FollowButton type="button" value="Follow" />
      </S.AuthorLink>
    </S.WrapperItem>
  );
};

export default AuthorItem;
