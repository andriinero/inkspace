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

import PostContainer from '@/features/authorPage/components/PostContainer';
import Error from '@/components/general/Error';
import {
  Header,
  PostsWrapper,
  ProfileIcon,
  ProfileWrapper,
  StyledAsideUserName,
  StyledMainUserName,
  Wrapper,
  WrapperAside,
  WrapperMain,
} from './AuthorPage.styled';
import { HollowButton } from '@/styles/components/HollowButton';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { FollowCount, SignUpDate, UserBio } from './Profile.styled';

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

  const isFollowed = profileData?.followed_users.some(
    (u) => u === authorData?._id
  ) as boolean;

  const handleFollowAdd = () => {
    if (authorData) dispatch(postFollowUser(authorData._id));
  };

  const handleFollowRemove = () => {
    if (authorData) dispatch(deleteFollowUser(authorData._id));
  };

  const signUpDate = DateTime.fromISO(authorData?.sign_up_date as string).toLocaleString(
    DateTime.DATE_MED
  );

  const handleFollowClick = isFollowed ? handleFollowRemove : handleFollowAdd;
  const followButtonText = isFollowed ? 'Followed' : 'Follow';

  return isLoading ? (
    <></>
  ) : error ? (
    <Error />
  ) : (
    <Wrapper>
      <WrapperMain>
        <StyledMainUserName>{authorData?.username}</StyledMainUserName>
        <PostsWrapper>
          <Header>Recent Posts</Header>
          <PostContainer userId={authorData?._id} />
        </PostsWrapper>
      </WrapperMain>
      <WrapperAside>
        <ProfileWrapper>
          <ProfileIcon imageId={authorData?.profile_image} altText="Profile Icon" />
          <StyledAsideUserName>{authorData?.username}</StyledAsideUserName>
          <FollowCount>{authorData?.followed_users_count} Following</FollowCount>
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
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default AuthorPage;
