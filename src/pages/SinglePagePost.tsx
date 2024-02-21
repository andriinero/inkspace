import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchPost,
  selectSinglePostState,
} from '@/features/singlePagePost/singlePagePostSlice';

import PostHeaderInfo from '@/features/singlePagePost/components/PostHeaderInfo';
import Error from '@/components/general/Error';
import Spinner from '@/components/general/Spinner';
import { Body, Header, PostWrapper, Wrapper } from './SinglePagePost.styled';
import PostControls from '@/features/singlePagePost/components/PostControls';

const SinglePagePost = () => {
  const dispatch = useAppDispatch();

  const { postid } = useParams();

  useEffect(() => {
    dispatch(fetchPost(postid!));
  }, [dispatch, postid]);

  const { post, isLoading, error } = useAppSelector(selectSinglePostState);

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
          <PostControls />
          <Body>{post.body}</Body>
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
