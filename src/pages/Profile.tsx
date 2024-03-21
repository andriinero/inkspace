import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Navigate } from 'react-router-dom';

import {
  fetchProfileData,
  selectFetchProfileDataState,
  selectProfileData,
} from '@/features/profile/profileSlice';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

import Error from '@/components/general/Error';
import BookmarkContainer from '@/features/profile/components/BookmarkContainer';
import {
  FollowCount,
  ProfileIcon,
  ProfileWrapper,
  StyledEditLink,
  StyledAsideUserName,
  Wrapper,
  WrapperAside,
  WrapperMain,
  StyledMainUserName,
  BookmarkWrapper,
  Header,
  SignUpDate,
  UserBio,
} from './Profile.styled';
import { DateTime } from 'luxon';

const Profile = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);
  const { isLoading, error } = useAppSelector(selectFetchProfileDataState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchProfileData());
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) return <Navigate to="/" />;

  const signUpDate = DateTime.fromISO(profileData?.sign_up_date as string).toLocaleString(
    DateTime.DATE_MED
  );

  return isLoading ? (
    <></>
  ) : error ? (
    <Error />
  ) : (
    <Wrapper>
      <WrapperMain>
        <StyledMainUserName>{profileData?.username}</StyledMainUserName>
        <BookmarkWrapper>
          <Header>Your Bookmarks</Header>
          <BookmarkContainer />
        </BookmarkWrapper>
      </WrapperMain>
      <WrapperAside>
        <ProfileWrapper>
          <ProfileIcon imageId={profileData?.profile_image} altText="Profile Icon" />
          <StyledAsideUserName>{profileData?.username}</StyledAsideUserName>
          <FollowCount>{profileData?.followed_users.length} Following</FollowCount>
          <FollowCount>{profileData?.users_following.length} Followers</FollowCount>
          <SignUpDate>Member since: {signUpDate}</SignUpDate>
          <StyledEditLink to="/profile/edit">Edit Profile</StyledEditLink>
          <UserBio>{profileData?.bio}</UserBio>
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default Profile;
