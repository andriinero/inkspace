import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectIsAuthenticated } from '@/features/auth/authSlice';

import * as S from './AuthorItem.styled';
import { deleteFollowUser, postFollowUser } from '@/features/profile/profileSlice';

type AuthorItemProps = {
  _id: string;
  username: string;
  bio?: string;
  isFollowed: boolean;
};

// TODO: fix bio styling
const AuthorItem = ({ _id, username, bio, isFollowed }: AuthorItemProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();

  const handleFollowAdd = () => {
    dispatch(postFollowUser(_id));
  };

  const handleFollowRemove = () => {
    dispatch(deleteFollowUser(_id));
  };

  const handleFollowClick = isFollowed ? handleFollowRemove : handleFollowAdd;
  const followButtonText = isFollowed ? 'Followed' : 'Follow';

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
      {isAuthenticated && (
        <S.FollowButton
          $isFollowed={isFollowed}
          onClick={handleFollowClick}
          type="button"
          value={followButtonText}
        />
      )}
    </S.WrapperItem>
  );
};

export default AuthorItem;
