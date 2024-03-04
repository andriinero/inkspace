import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import parse from 'html-react-parser';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  fetchPost,
  selectFetchPostState,
  selectCurrentPostData,
} from '@/features/singlePagePost/singlePagePostSlice';

import { Body, Header, PostWrapper, Wrapper } from './SinglePagePost.styled';
import PostHeaderInfo from '@/features/singlePagePost/components/PostHeaderInfo';
import Error from '@/components/general/Error';
import Spinner from '@/components/loaders/Spinner';
import PostControls from '@/features/singlePagePost/components/PostControls';
import PostComments from '@/features/commentList/components/CommentList';

const SinglePagePost = () => {
  const { postid } = useParams();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPost(postid!));
  }, [dispatch, postid]);

  const postData = useAppSelector(selectCurrentPostData);
  const { isLoading, error } = useAppSelector(selectFetchPostState);

  return (
    <Wrapper>
      {postData ? (
        <PostWrapper>
          <Header>{postData.title}</Header>
          <PostHeaderInfo
            bodyLength={postData.body.length}
            date={postData.date}
            topic={postData.topic}
            author={postData.author}
          />
          {isAuthenticated && <PostControls postId={postData._id} />}
          <Body>{parse(postData.body)}</Body>
          <PostComments postId={postData._id} />
        </PostWrapper>
      ) : isLoading ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        <h2>Critical error.</h2>
      )}
    </Wrapper>
  );
};

export default SinglePagePost;
