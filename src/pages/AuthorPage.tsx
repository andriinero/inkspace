import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';
import useFollowUserAction from '@/hooks/useFollowUserAction';
import useAuthorPageLoadingState from '@/hooks/useAuthorPageLoadingState';
import { AppDate } from '@/lib/AppDate';

import {
  selectAuthData,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import {
  selectFollowActionState,
  selectIsUserFollowed,
} from '@/features/profile/profileSlice';
import {
  fetchAuthorData,
  fetchAuthorPosts,
  resetState,
  selectAuthorData,
  selectFetchAuthorDataState,
} from '@/features/authorPage/authorPageSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { FadeIn } from '@/styles/animations/FadeIn';

import PostContainer from '@/features/authorPage/components/PostContainer';
import Error from '@/components/general/Error';
import JumpButton from '@/components/general/JumpButton';
import * as S from './AuthorPage.styled';

const AuthorPage = () => {
  const { isScrollingDown } = useWindowScrollDirection();
  const { authorid } = useParams();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isFollowed = useAppSelector(
    selectIsUserFollowed(authorid as string),
  ) as boolean;

  const authData = useAppSelector(selectAuthData);

  const authorData = useAppSelector(selectAuthorData);
  const isLoading = useAuthorPageLoadingState();
  const { error } = useAppSelector(selectFetchAuthorDataState);

  const followActionState = useAppSelector(selectFollowActionState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAuthorData(authorid!)).unwrap();
        await dispatch(fetchAuthorPosts(authorid!)).unwrap();
      } catch (err) {
        dispatch(
          addNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
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
    followActionState.isLoading,
  );

  if (authorid === authData?.sub) return <Navigate to="/profile/bookmarks" />;

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
          <PostContainer />
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
          <S.FollowCount>
            {authorData?.followed_users_count} Following
          </S.FollowCount>
          <S.FollowCount>
            {authorData?.users_following_count} Followers
          </S.FollowCount>
          <S.SignUpDate>Member since: {signUpDate}</S.SignUpDate>
          <S.UserBio>{authorData?.bio}</S.UserBio>
          {isAuthenticated && (
            <S.FollowButton
              whileTap={ButtonInteraction.whileTap.animation}
              $isActive={isFollowed}
              onClick={handleFollowClick}
              type="button"
              value={isFollowed ? 'Followed' : 'Follow'}
            />
          )}
        </S.ProfileWrapper>
      </S.WrapperAside>
      {isScrollingDown && <JumpButton />}
    </S.Wrapper>
  );
};

export default AuthorPage;
