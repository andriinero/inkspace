import { useEffect } from 'react';
import {
  FollowCount,
  ProfileIcon,
  ProfileWrapper,
  StyledFollowLink,
  StyledUserName,
  Wrapper,
  WrapperAside,
  WrapperMain,
} from './Profile.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchProfileData,
  selectFetchProfileDataState,
  selectProfileData,
} from '@/features/profile/profileSlice';

const Profile = () => {
  const profileData = useAppSelector(selectProfileData);
  const { isLoading, error } = useAppSelector(selectFetchProfileDataState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <Wrapper>
      <WrapperMain></WrapperMain>
      <WrapperAside>
        <ProfileWrapper>
          <ProfileIcon src="/portrait-placeholder.png" alt="Profile Icon" />
          <StyledUserName>{profileData?.username}</StyledUserName>
          <FollowCount>{profileData?.followed_users.length} Followed</FollowCount>
          <StyledFollowLink to="/profile/edit">Edit Profile</StyledFollowLink>
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default Profile;
