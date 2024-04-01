import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';
import useProfilePageLoadingState from '@/hooks/useProfilePageLoadingState';
import { Navigate, Outlet } from 'react-router-dom';
import { AppDate } from '@/lib/AppDate';

import {
  fetchProfileBookmarks,
  fetchProfileData,
  selectFetchProfileDataState,
  selectProfileData,
} from '@/features/profile/profileSlice';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { FadeIn } from '@/styles/animations/FadeIn';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import Error from '@/components/general/Error';
import BookmarkContainer from '@/features/profile/components/BookmarkContainer';
import JumpButton from '@/components/general/JumpButton';
import * as S from './Profile.styled';
import ProfileTabs from '@/features/profile/components/ProfileTabs';

const Profile = () => {
  const { isScrollingDown } = useWindowScrollDirection();

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
      } catch (err) {
        dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
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
          <S.FollowCount>{profileData?.followed_users.length} Following</S.FollowCount>
          <S.FollowCount>{profileData?.users_following.length} Followers</S.FollowCount>
          <S.SignUpDate>Member since: {signUpDate}</S.SignUpDate>
          <S.StyledEditLink to="/profile/edit">Edit Profile</S.StyledEditLink>
          <S.UserBio>{profileData?.bio}</S.UserBio>
        </S.ProfileWrapper>
      </S.WrapperAside>
      {isScrollingDown && <JumpButton />}
    </S.Wrapper>
  );
};

export default Profile;
