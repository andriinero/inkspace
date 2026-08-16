import { useAppSelector } from '@/app/hooks';
import useIgnoreUserAction from '@/hooks/useIgnoreUserAction';

import {
  selectAuthData,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import {
  selectIgnoreUserActionState,
  selectIsUserIgnored,
} from '@/features/profile/profileSlice';

import { Username } from '@/components/styled/Username.styled';
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';
import { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import * as S from '@/features/profile/components/profile/IgnoredUserItem.styled';

type IgnoredUserProps = {
  className?: string;
} & GeneralAuthorData;

const IgnoredUserItem = ({
  _id,
  username,
  bio,
  profile_image,
  className,
}: IgnoredUserProps) => {
  const authData = useAppSelector(selectAuthData);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isIgnored = useAppSelector(selectIsUserIgnored(_id)) as boolean;

  const { isLoading } = useAppSelector(selectIgnoreUserActionState);

  const handleIgnoreClick = useIgnoreUserAction(_id, isIgnored, isLoading);

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
          $isActive={isIgnored}
          onClick={handleIgnoreClick}
          type="button"
          value={isIgnored ? 'Muted' : 'Mute'}
        />
      )}
    </S.WrapperItem>
  );
};

export default IgnoredUserItem;
