import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectAuthData } from '@/features/auth/authSlice';
import {
  deleteFollowUser,
  postFollowUser,
  selectProfileData,
} from '@/features/profile/profileSlice';

import {
  fetchAuthor,
  resetAuthor,
  selectAuthorData,
  selectFetchAuthorState,
} from '@/features/authorPage/authorPageSlice';

import PostContainer from '@/features/authorPage/components/PostContainer';
import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';
import {
  FollowButton,
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

const AuthorPage = () => {
  const { authorid } = useParams();

  const profileData = useAppSelector(selectProfileData);
  const authData = useAppSelector(selectAuthData);

  const authorData = useAppSelector(selectAuthorData);
  const { isLoading, error } = useAppSelector(selectFetchAuthorState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthor(authorid!));

    return () => {
      dispatch(resetAuthor());
    };
  }, [authorid, dispatch]);

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
          <Header>User Posts</Header>
          <PostContainer userId={authorData?._id} />
        </PostsWrapper>
      </WrapperMain>
      <WrapperAside>
        <ProfileWrapper>
          <ProfileIcon src="/portrait-placeholder.png" alt="Profile Icon" />
          <StyledAsideUserName>{authorData?.username}</StyledAsideUserName>
          <FollowButton
            $isFollowed={isFollowed}
            onClick={handleFollowClick}
            type="button"
            value={followButtonText}
          />
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default AuthorPage;
