import { useEffect, useState } from 'react';
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
import PostComments from '@/features/singlePagePost/components/PostComments';

const SinglePagePost = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { postid } = useParams();

  useEffect(() => {
    dispatch(fetchPost(postid!));
  }, [dispatch, postid]);

  const { post, isLoading, error } = useAppSelector(selectSinglePostState);

  const handleLikeToggle = (): void => {
    setIsLiked(!isLiked);
  };

  const handleCommentsToggle = (): void => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  const handleBookmarkToggle = (): void => {
    setIsBookmarked(!isBookmarked);
  };

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
          <PostControls
            onLikedToggle={handleLikeToggle}
            onCommentsToggle={handleCommentsToggle}
            onBookmarkedToggle={handleBookmarkToggle}
            isBookmarked={isBookmarked}
            isLiked={isLiked}
          />
          <Body>{post.body}</Body>
          <PostComments isOpen={isCommentsOpen} commentList={post.comments} />
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
