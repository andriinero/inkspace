import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';
import parse from 'html-react-parser';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { selectProfileId } from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';
import {
  fetchPost,
  selectCurrentPostData,
  selectFetchPostState,
} from '@/features/singlePagePost/singlePagePostSlice';

import { FadeIn } from '@/styles/animations/FadeIn';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import Error from '@/components/general/Error';
import JumpButton from '@/components/general/JumpButton';
import ScrollProgressBar from '@/components/general/ScrollProgressBar';
import PostPageLoader from '@/components/loaders/PostPageLoader';
import CommentList from '@/features/commentList/components/CommentList';
import PostControls from '@/features/singlePagePost/components/PostControls';
import PostHeaderInfo from '@/features/singlePagePost/components/PostHeaderInfo';
import {
  Body,
  Header,
  PostWrapper,
  PreviewImage,
  Wrapper,
} from './SinglePagePost.styled';

const SinglePagePost = () => {
  const { postid } = useParams();
  const { isScrollingUp } = useWindowScrollDirection();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileId = useAppSelector(selectProfileId);

  const postData = useAppSelector(selectCurrentPostData);
  const { isLoading, error } = useAppSelector(selectFetchPostState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPost(postid!)).unwrap();
      } catch (err) {
        dispatch(
          addPushNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    };

    if (postid) fetchData();
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
            {postData.thumbnail_image && (
              <PreviewImage
                imageId={postData.thumbnail_image}
                altText="Post Preview Image"
              />
            )}
            <Body>{parse(postData.body)}</Body>
          </PostWrapper>
          <CommentList postId={postData._id} />
        </>
      ) : isLoading ? (
        <PostPageLoader />
      ) : error ? (
        <Error />
      ) : (
        <h2>Critical error.</h2>
      )}
      {isScrollingUp && <JumpButton />}
    </Wrapper>
  );
};

export default SinglePagePost;
