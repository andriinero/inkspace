import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchPosts,
  selectFetchPostListState,
  selectIsFollowingList,
  selectPostList,
  selectSelectedTopic,
} from '../postListSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { Waterfall } from '@/styles/animations/Waterfall';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import PostItem from '../../../components/general/PostItem';
import PostListLoader from '@/components/loaders/PostListLoader';
import { PostList, Wrapper } from './PostContainer.styled';
import { CalloutText } from '@/components/styled/CalloutText.styled';

const PostContainer = () => {
  const postList = useAppSelector(selectPostList);
  const { isLoading, error } = useAppSelector(selectFetchPostListState);

  const selectedTopic = useAppSelector(selectSelectedTopic);
  const isFollowList = useAppSelector(selectIsFollowingList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPosts()).unwrap();
      } catch (err) {
        dispatch(
          addPushNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    };

    fetchData();
  }, [selectedTopic, isFollowList, dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <PostListLoader />
      ) : error ? (
        <PostListLoader />
      ) : postList.length === 0 ? (
        <CalloutText>Nothing posted yet!</CalloutText>
      ) : (
        <PostList
          variants={Waterfall.container}
          initial="hidden"
          animate="visible"
        >
          {postList.map((post) => (
            <PostItem key={post._id} {...post} />
          ))}
        </PostList>
      )}
    </Wrapper>
  );
};

export default PostContainer;
