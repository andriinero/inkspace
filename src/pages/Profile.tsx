import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';
import { Navigate } from 'react-router-dom';
import { DateTime } from 'luxon';

import {
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

const Profile = () => {
  const { isScrollingDown } = useWindowScrollDirection();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);
  const { isLoading, error } = useAppSelector(selectFetchProfileDataState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProfileData()).unwrap();
      } catch (err) {
        dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
      }
    };

    if (isAuthenticated) fetchData();
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
    <S.Wrapper
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
    >
      <S.WrapperMain>
        <S.StyledMainUserName>{profileData?.username}</S.StyledMainUserName>
        <S.BookmarkWrapper>
          <S.Header>Your Bookmarks</S.Header>
          <BookmarkContainer />
        </S.BookmarkWrapper>
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
