import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectAuthData, selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  deleteFollowUser,
  postFollowUser,
  selectProfileData,
} from '@/features/profile/profileSlice';
import {
  fetchAuthor,
  resetState,
  selectAuthorData,
  selectFetchAuthorState,
} from '@/features/authorPage/authorPageSlice';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { FadeIn } from '@/styles/animations/FadeIn';

import PostContainer from '@/features/authorPage/components/PostContainer';
import Error from '@/components/general/Error';
import { HollowButton } from '@/components/styled/HollowButton';
import { FollowCount, SignUpDate, UserBio } from './Profile.styled';
import * as S from './AuthorPage.styled';

const AuthorPage = () => {
  const { authorid } = useParams();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const authData = useAppSelector(selectAuthData);
  const profileData = useAppSelector(selectProfileData);

  const authorData = useAppSelector(selectAuthorData);
  const { isLoading, error } = useAppSelector(selectFetchAuthorState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorid !== authData?.sub) dispatch(fetchAuthor(authorid!));

    return () => {
      dispatch(resetState());
    };
  }, [authData?.sub, authorid, dispatch]);

  if (authorid === authData?.sub) return <Navigate to="/profile" />;

  const handleFollowAdd = (): void => {
    if (authorData) dispatch(postFollowUser(authorData._id));
  };

  const handleFollowRemove = (): void => {
    if (authorData) dispatch(deleteFollowUser(authorData._id));
  };

  const signUpDate = DateTime.fromISO(authorData?.sign_up_date as string).toLocaleString(
    DateTime.DATE_MED
  );

  const isFollowed = profileData?.followed_users.some(
    (u) => u === authorData?._id
  ) as boolean;

  const followButtonText = isFollowed ? 'Followed' : 'Follow';
  const handleFollowClick = isFollowed ? handleFollowRemove : handleFollowAdd;

  return isLoading ? (
    <></>
  ) : error ? (
    <Error />
  ) : (
    <S.Wrapper
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
    >
      <S.WrapperMain>
        <S.StyledMainUserName>{authorData?.username}</S.StyledMainUserName>
        <S.PostsWrapper>
          <S.Header>Recent Posts</S.Header>
          <PostContainer userId={authorData?._id} />
        </S.PostsWrapper>
      </S.WrapperMain>
      <S.WrapperAside>
        <S.ProfileWrapper>
          <S.ProfileIcon
            imageId={authorData?.profile_image}
            placeholderSrc="/portrait-placeholder.png"
            altText="Profile Icon"
          />
          <S.StyledAsideUserName>{authorData?.username}</S.StyledAsideUserName>
          <FollowCount>{authorData?.followed_users_count} Following</FollowCount>
          <FollowCount>{authorData?.users_following_count} Followers</FollowCount>
          <SignUpDate>Member since: {signUpDate}</SignUpDate>
          {isAuthenticated && (
            <HollowButton
              whileTap={ButtonInteraction.whileTap.animation}
              $isActive={isFollowed}
              onClick={handleFollowClick}
              type="button"
              value={followButtonText}
            />
          )}
          <UserBio>{authorData?.bio}</UserBio>
        </S.ProfileWrapper>
      </S.WrapperAside>
    </S.Wrapper>
  );
};

export default AuthorPage;
