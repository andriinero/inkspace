import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchProfileData,
  selectFetchProfileDataState,
  selectProfileData,
} from '@/features/profile/profileSlice';

import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';
import BookmarkContainer from '@/features/profile/components/BookmarkContainer';
import {
  FollowCount,
  ProfileIcon,
  ProfileWrapper,
  StyledFollowLink,
  StyledAsideUserName,
  Wrapper,
  WrapperAside,
  WrapperMain,
  StyledMainUserName,
  BookmarkWrapper,
} from './Profile.styled';

const Profile = () => {
  const profileData = useAppSelector(selectProfileData);
  const { isLoading, error } = useAppSelector(selectFetchProfileDataState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <Wrapper>
      <WrapperMain>
        <StyledMainUserName>{profileData?.username}</StyledMainUserName>
        <BookmarkWrapper>
          <BookmarkContainer />
        </BookmarkWrapper>
      </WrapperMain>
      <WrapperAside>
        <ProfileWrapper>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <Error />
          ) : (
            <>
              <ProfileIcon src="/portrait-placeholder.png" alt="Profile Icon" />
              <StyledAsideUserName>{profileData?.username}</StyledAsideUserName>
              <FollowCount>{profileData?.followed_users.length} Following</FollowCount>
              <StyledFollowLink to="/profile/edit">Edit Profile</StyledFollowLink>
            </>
          )}
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default Profile;
