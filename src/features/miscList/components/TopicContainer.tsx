import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { fetchTopics, selectTopicList, selectFetchTopicsState } from '../miscListSlice';

import { Header, TopicList, Wrapper } from './TopicContainer.styled';
import TopicItem from './TopicItem';
import TopicListLoader from '@/components/loaders/TopicListLoader';
import Error from '@/components/general/Error';
import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';

const TopicContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const topicList = useAppSelector(selectTopicList);
  const { isLoading, error } = useAppSelector(selectFetchTopicsState);

  return (
    <Wrapper>
      <Header>Explore topics</Header>
      {isLoading ? (
        <TopicListLoader />
      ) : error ? (
        <Error />
      ) : (
        <TopicList variants={WaterfallPopUp.container} initial="hidden" animate="visible">
          {topicList.map((topic) => (
            <TopicItem key={topic._id} {...topic} />
          ))}
        </TopicList>
      )}
    </Wrapper>
  );
};

export default TopicContainer;
