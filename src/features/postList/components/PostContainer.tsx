import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useHomePageStatus from '@/hooks/useHomeLoadingStatus';

import {
  fetchPosts,
  selectFetchPostListState,
  selectPostList,
  selectSelectedTopic,
} from '../postListSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { TopicData } from '@/types/entityData/TopicData';
import { Waterfall } from '@/styles/animations/Waterfall';
import { FadeInSlide } from '@/styles/animations/FadeInSlide';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import PostItem from './PostItem';
import PostListLoader from '@/components/loaders/PostListLoader';
import { CalloutText, PostList, Wrapper } from './PostContainer.styled';

const PostContainer = () => {
  const postList = useAppSelector(selectPostList);
  const isLoading = useHomePageStatus();
  const { error } = useAppSelector(selectFetchPostListState);

  const selectedTopic = useAppSelector(selectSelectedTopic) as TopicData;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPosts(selectedTopic?._id)).unwrap();
      } catch (err) {
        dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
      }
    };

    fetchData();
  }, [selectedTopic, dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <PostListLoader />
      ) : error ? (
        <PostListLoader />
      ) : postList.length === 0 ? (
        <CalloutText
          initial={FadeInSlide.hidden}
          animate={FadeInSlide.visible}
          transition={FadeInSlide.transition}
        >
          Be the first one to post!
        </CalloutText>
      ) : (
        <PostList variants={Waterfall.container} initial="hidden" animate="visible">
          {postList.map((post) => (
            <PostItem key={post._id} {...post} />
          ))}
        </PostList>
      )}
    </Wrapper>
  );
};

export default PostContainer;
