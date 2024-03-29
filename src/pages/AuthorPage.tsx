import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';

import { selectAuthData, selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  deleteFollowUser,
  postFollowUser,
  selectFollowActionState,
  selectIsUserFollowed,
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
import JumpButton from '@/components/general/JumpButton';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import useFollowUserAction from '@/hooks/useFollowUserAction';
import { AppDate } from '@/lib/AppDate';

const AuthorPage = () => {
  const { isScrollingDown } = useWindowScrollDirection();
  const { authorid } = useParams();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isFollowed = useAppSelector(selectIsUserFollowed(authorid as string)) as boolean;

  const followActionState = useAppSelector(selectFollowActionState);

  const authData = useAppSelector(selectAuthData);

  const authorData = useAppSelector(selectAuthorData);
  const { isLoading, error } = useAppSelector(selectFetchAuthorState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAuthor(authorid!));
      } catch (err) {
        dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
      }
    };

    if (authorid !== authData?.sub) fetchData();

    return () => {
      dispatch(resetState());
    };
  }, [authData?.sub, authorid, dispatch]);

  const handleFollowClick = useFollowUserAction(
    authorData?._id as string,
    isFollowed,
    followActionState.isLoading
  );

  if (authorid === authData?.sub) return <Navigate to="/profile" />;

  const signUpDate = AppDate.getMedDate(authorData?.sign_up_date as string);

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
              value={isFollowed ? 'Followed' : 'Follow'}
            />
          )}
          <UserBio>{authorData?.bio}</UserBio>
        </S.ProfileWrapper>
      </S.WrapperAside>
      {isScrollingDown && <JumpButton />}
    </S.Wrapper>
  );
};

export default AuthorPage;
