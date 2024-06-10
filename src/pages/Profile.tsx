import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useProfilePageLoadingState from '@/hooks/useProfilePageLoadingState';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';
import { AppDate } from '@/lib/AppDate';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  fetchFollowedUsers,
  fetchIgnoredUsers,
  fetchProfileBookmarks,
  fetchProfileData,
  fetchProfilePosts,
  selectFetchProfileDataState,
  selectProfileData,
} from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { FadeIn } from '@/styles/animations/FadeIn';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import Error from '@/components/general/Error';
import JumpButton from '@/components/general/JumpButton';
import ProfileTabs from '@/features/profile/components/profile/ProfileTabs';
import * as S from './Profile.styled';

const Profile = () => {
  const { isScrollingUp } = useWindowScrollDirection();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);
  const isLoading = useProfilePageLoadingState();
  const { error } = useAppSelector(selectFetchProfileDataState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProfileData()).unwrap();
        await dispatch(fetchProfileBookmarks()).unwrap();
        await dispatch(fetchProfilePosts()).unwrap();
        await dispatch(fetchFollowedUsers()).unwrap();
        await dispatch(fetchIgnoredUsers()).unwrap();
      } catch (err) {
        dispatch(
          addPushNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) return <Navigate to="/" />;

  const signUpDate = AppDate.getMedDate(profileData?.sign_up_date as string);

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
        <S.StyledMainUserName>{profileData?.username}</S.StyledMainUserName>
        <S.WrapperSection>
          <ProfileTabs />
          <Outlet />
        </S.WrapperSection>
      </S.WrapperMain>
      <S.WrapperAside>
        <S.ProfileWrapper>
          <S.ProfileIcon
            imageId={profileData?.profile_image}
            placeholderSrc="/portrait-placeholder.png"
            altText="Profile Icon"
          />
          <S.StyledAsideUserName>{profileData?.username}</S.StyledAsideUserName>
          <S.FollowCount>
            {profileData?.followed_users.length} Following
          </S.FollowCount>
          <S.FollowCount>
            {profileData?.users_following.length} Followers
          </S.FollowCount>
          <S.SignUpDate>Member since: {signUpDate}</S.SignUpDate>
          <S.StyledEditLink to="/profile/edit">Edit Profile</S.StyledEditLink>
          <S.UserBio>{profileData?.bio}</S.UserBio>
        </S.ProfileWrapper>
      </S.WrapperAside>
      {isScrollingUp && <JumpButton />}
    </S.Wrapper>
  );
};

export default Profile;
