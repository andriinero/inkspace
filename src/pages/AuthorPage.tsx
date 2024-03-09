import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchAuthor,
  selectAuthorData,
  selectFetchAuthorState,
} from '@/features/authorPage/authorPageSlice';

import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';
import {
  PostsWrapper,
  ProfileIcon,
  ProfileWrapper,
  StyledAsideUserName,
  StyledMainUserName,
  Wrapper,
  WrapperAside,
  WrapperMain,
} from './AuthorPage.styled';
import { selectAuthData } from '@/features/auth/authSlice';
import PostContainer from '@/features/authorPage/components/PostContainer';

const AuthorPage = () => {
  const { authorid } = useParams();

  const authData = useAppSelector(selectAuthData);

  const authorData = useAppSelector(selectAuthorData);
  const { isLoading, error } = useAppSelector(selectFetchAuthorState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthor(authorid!));
  }, [authorid, dispatch]);

  if (authorid === authData?.sub) return <Navigate to="/profile" />;

  return (
    <Wrapper>
      <WrapperMain>
        <StyledMainUserName>{authorData?.username}</StyledMainUserName>
        <PostsWrapper>
          <PostContainer userId={authorData?._id} />
        </PostsWrapper>
      </WrapperMain>
      <WrapperAside>
        <ProfileWrapper>
          <ProfileIcon src="/portrait-placeholder.png" alt="Profile Icon" />
          <StyledAsideUserName>{authorData?.username}</StyledAsideUserName>
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default AuthorPage;
