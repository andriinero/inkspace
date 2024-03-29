import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { fetchTopics, selectTopicList, selectFetchTopicsState } from '../miscListSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';
import { Header, TopicList, Wrapper } from './TopicContainer.styled';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import TopicItem from './TopicItem';
import TopicListLoader from '@/components/loaders/TopicListLoader';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

const TopicContainer = () => {
  const topicList = useAppSelector(selectTopicList);
  const { isLoading, error } = useAppSelector(selectFetchTopicsState);

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
          <Header>Explore topics</Header>
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
