import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchProfileData,
  selectFetchProfileDataState,
  selectProfileData,
} from '@/features/profile/profileSlice';

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
} from './Profile.styled';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);
  const { isLoading, error } = useAppSelector(selectFetchProfileDataState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  if (!isAuthenticated) return <Navigate to="/" />;

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
          <ProfileIcon src="/portrait-placeholder.png" alt="Profile Icon" />
          <StyledAsideUserName>{profileData?.username}</StyledAsideUserName>
          <FollowCount>{profileData?.followed_users.length} Following</FollowCount>
          <StyledEditLink to="/profile/edit">Edit Profile</StyledEditLink>
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default Profile;
