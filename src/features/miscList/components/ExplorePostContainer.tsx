import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useHomePageStatus from '@/hooks/useHomeLoadingStatus';

import {
  fetchMiscPosts,
  selectFetchMiscPostsState,
  selectMiscPostList,
} from '../miscListSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import MiscListLoader from '@/components/loaders/MiscListLoader';
import ExplorePostItem from './ExplorePostItem';
import { PostList, Wrapper } from './ExplorePostContainer.styled';
import SectionHeader from './SectionHeader';

const ExplorePostContainer = () => {
  const postList = useAppSelector(selectMiscPostList);
  const isLoading = useHomePageStatus();
  const { error } = useAppSelector(selectFetchMiscPostsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMiscPosts()).unwrap();
      } catch (err) {
        dispatch(
          addNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <MiscListLoader />
      ) : (
        <>
          <SectionHeader>Explore new posts</SectionHeader>
          <PostList
            variants={WaterfallSlideIn.container}
            initial="hidden"
            animate="visible"
          >
            {postList.map((p) => (
              <ExplorePostItem key={p._id} {...p} />
            ))}
          </PostList>
        </>
      )}
    </Wrapper>
  );
};
export default ExplorePostContainer;
