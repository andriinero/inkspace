import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useHomePageStatus from '@/hooks/useHomeLoadingStatus';

import {
  fetchTopics,
  selectMiscTopicList,
  selectFetchMiscTopicsState,
} from '../miscListSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';
import { Header, TopicList, Wrapper } from './TopicContainer.styled';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import TopicItem from './TopicItem';
import TopicListLoader from '@/components/loaders/TopicListLoader';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

const TopicContainer = () => {
  const topicList = useAppSelector(selectMiscTopicList);
  const isLoading = useHomePageStatus();
  const { error } = useAppSelector(selectFetchMiscTopicsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTopics()).unwrap();
      } catch (err) {
        dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <TopicListLoader />
      ) : error ? (
        <TopicListLoader />
      ) : (
        <>
          <Header>Recently added topics</Header>
          <TopicList
            variants={WaterfallPopUp.container}
            initial="hidden"
            animate="visible"
          >
            {topicList.map((topic) => (
              <TopicItem key={topic._id} {...topic} />
            ))}
          </TopicList>
        </>
      )}
    </Wrapper>
  );
};

export default TopicContainer;
