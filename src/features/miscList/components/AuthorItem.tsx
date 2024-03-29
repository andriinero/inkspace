import { useAppSelector } from '@/app/hooks';
import useFollowUserAction from '@/hooks/useFollowUserAction';

import { selectAuthData, selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  selectFollowActionState,
  selectIsUserFollowed,
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
  profile_image?: string;
};

const AuthorItem = ({ _id, username, bio, profile_image }: AuthorItemProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isFollowed = useAppSelector(selectIsUserFollowed(_id)) as boolean;

  const { isLoading } = useAppSelector(selectFollowActionState);

  const authData = useAppSelector(selectAuthData);

  const handleFollowClick = useFollowUserAction(_id, isFollowed, isLoading);

  return (
    <S.WrapperItem variants={WaterfallSlideIn.item}>
      <S.StyledLink to={`/authors/${_id}`}>
        <S.AuthorIcon
          imageId={profile_image}
          placeholderSrc="/portrait-placeholder.png"
          altText="Author Icon"
        />
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
          value={isFollowed ? 'Followed' : 'Follow'}
        />
      )}
    </S.WrapperItem>
  );
};

export default AuthorItem;
