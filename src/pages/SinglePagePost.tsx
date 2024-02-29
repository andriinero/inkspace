import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchPost,
  selectPostData,
  selectPostError,
  selectPostIsLoading,
} from '@/features/singlePagePost/singlePagePostSlice';

import { Body, Header, PostWrapper, Wrapper } from './SinglePagePost.styled';
import PostHeaderInfo from '@/features/singlePagePost/components/PostHeaderInfo';
import Error from '@/components/general/Error';
import Spinner from '@/components/general/Spinner';
import PostControls from '@/features/singlePagePost/components/PostControls';
import PostComments from '@/features/singlePagePost/components/PostComments';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

const SinglePagePost = () => {
  const { postid } = useParams();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPost(postid!));
  }, [dispatch, postid]);

  const post = useAppSelector(selectPostData);
  const isLoading = useAppSelector(selectPostIsLoading);
  const error = useAppSelector(selectPostError);

  return (
    <Wrapper>
      {post ? (
        <PostWrapper>
          <Header>{post.title}</Header>
          <PostHeaderInfo
            bodyLength={post.body.length}
            date={post.date}
            topic={post.topic}
            author={post.author}
          />
          {isAuthenticated && <PostControls />}
          <Body>{parse(post.body)}</Body>
          <PostComments commentList={post.comments} />
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
