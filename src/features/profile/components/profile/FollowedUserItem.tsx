import { useAppSelector } from '@/app/hooks';
import useFollowUserAction from '@/hooks/useFollowUserAction';

import { selectAuthData, selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  selectFollowActionState,
  selectIsUserFollowed,
} from '@/features/profile/profileSlice';

import { Username } from '@/components/styled/Username.styled';
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';
import { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import * as S from '@/features/profile/components/profile/FollowedUserItem.styled';

type FollowedUserProps = {
  className?: string;
} & GeneralAuthorData;

const FollowedUserItem = ({
  _id,
  username,
  bio,
  profile_image,
  className,
}: FollowedUserProps) => {
  const authData = useAppSelector(selectAuthData);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isFollowed = useAppSelector(selectIsUserFollowed(_id)) as boolean;

  const { isLoading } = useAppSelector(selectFollowActionState);

  const handleFollowClick = useFollowUserAction(_id, isFollowed, isLoading);

  return (
    <S.WrapperItem variants={WaterfallSlideIn.item} className={className}>
      <S.InfoWrapper>
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
      </S.InfoWrapper>
      {isAuthenticated && authData?.sub !== _id && (
        <S.StyledHollowButton
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

export default FollowedUserItem;
