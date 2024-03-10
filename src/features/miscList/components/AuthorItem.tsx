import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectAuthData, selectIsAuthenticated } from '@/features/auth/authSlice';

import * as S from './AuthorItem.styled';
import { deleteFollowUser, postFollowUser } from '@/features/profile/profileSlice';
import { Username } from '@/styles/components/Username.styled';
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';
import { HollowButton } from '@/styles/components/HollowButton';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

type AuthorItemProps = {
  _id: string;
  username: string;
  bio?: string;
  isFollowed: boolean;
};

const AuthorItem = ({ _id, username, bio, isFollowed }: AuthorItemProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authData = useAppSelector(selectAuthData);

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
    <S.WrapperItem variants={WaterfallSlideIn.item}>
      <S.StyledLink to={`/authors/${_id}`}>
        <S.Icon src="/portrait-placeholder.png" />
      </S.StyledLink>
      <S.BioContainer>
        <S.StyledLink to={`/authors/${_id}`}>
          <Username>{username}</Username>
        </S.StyledLink>
        <S.BioContent>{bio || 'No user bio'}</S.BioContent>
      </S.BioContainer>
      {isAuthenticated && authData?.sub !== _id && (
        <HollowButton
          whileTap={ButtonInteraction.whileTap.animation}
          transition={ButtonInteraction.whileTap.transition}
          $isActive={isFollowed}
          onClick={handleFollowClick}
          type="button"
          value={followButtonText}
        />
      )}
    </S.WrapperItem>
  );
};

export default AuthorItem;
