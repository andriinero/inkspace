import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectAuthData, selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  deleteFollowUser,
  postFollowUser,
  selectFollowActionState,
} from '@/features/profile/profileSlice';

import { Username } from '@/components/styled/Username.styled';
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';
import { HollowButton } from '@/components/styled/HollowButton';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import * as S from './AuthorItem.styled';

type AuthorItemProps = {
  _id: string;
  username: string;
  bio?: string;
  isFollowed: boolean;
  profile_image: string;
};

const AuthorItem = ({
  _id,
  username,
  bio,
  isFollowed,
  profile_image,
}: AuthorItemProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const authData = useAppSelector(selectAuthData);
  const followActionState = useAppSelector(selectFollowActionState);

  const dispatch = useAppDispatch();

  const handleFollowAdd = (): void => {
    if (!followActionState.isLoading) dispatch(postFollowUser(_id));
  };

  const handleFollowRemove = (): void => {
    if (!followActionState.isLoading) dispatch(deleteFollowUser(_id));
  };

  const handleFollowClick = isFollowed ? handleFollowRemove : handleFollowAdd;
  const followButtonText = isFollowed ? 'Followed' : 'Follow';

  return (
    <S.WrapperItem variants={WaterfallSlideIn.item}>
      <S.StyledLink to={`/authors/${_id}`}>
        <S.AuthorIcon imageId={profile_image} altText="Author Icon" />
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
