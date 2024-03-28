import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';
import parse from 'html-react-parser';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  fetchPost,
  selectFetchPostState,
  selectCurrentPostData,
} from '@/features/singlePagePost/singlePagePostSlice';
import { selectProfileId } from '@/features/profile/profileSlice';

import { FadeIn } from '@/styles/animations/FadeIn';

import PostHeaderInfo from '@/features/singlePagePost/components/PostHeaderInfo';
import Error from '@/components/general/Error';
import PostControls from '@/features/singlePagePost/components/PostControls';
import PostComments from '@/features/commentList/components/CommentList';
import PostPageLoader from '@/components/loaders/PostPageLoader';
import ScrollProgressBar from '@/components/general/ScrollProgressBar';
import JumpButton from '@/components/general/JumpButton';
import { Body, Header, PostWrapper, Wrapper } from './SinglePagePost.styled';

const SinglePagePost = () => {
  const { postid } = useParams();
  const { isScrollingDown } = useWindowScrollDirection();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileId = useAppSelector(selectProfileId);

  const postData = useAppSelector(selectCurrentPostData);
  const { isLoading, error } = useAppSelector(selectFetchPostState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postid) dispatch(fetchPost(postid));
  }, [dispatch, postid]);

  const isAuthor = profileId === postData?.author._id;

  return (
    <Wrapper>
      {postData ? (
        <>
          <ScrollProgressBar />
          <PostWrapper
            initial={FadeIn.hidden}
            animate={FadeIn.visible}
            transition={FadeIn.transition}
          >
            <Header>{postData.title}</Header>
            <PostHeaderInfo
              isAuthor={isAuthor}
              author={postData.author}
              date={postData.date}
              topic={postData.topic}
              bodyLength={postData.body.length}
            />
            {isAuthenticated && (
              <PostControls postId={postData._id} isAuthor={isAuthor} />
            )}
            <Body>{parse(postData.body)}</Body>
          </PostWrapper>
          <PostComments postId={postData._id} />
        </>
      ) : isLoading ? (
        <PostPageLoader />
      ) : error ? (
        <Error />
      ) : (
        <h2>Critical error.</h2>
      )}
      {isScrollingDown && <JumpButton />}
    </Wrapper>
  );
};

export default SinglePagePost;
