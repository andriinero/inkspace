import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { fetchTopics, selectTopicList, selectFetchTopicsState } from '../miscListSlice';

import { Header, TopicList, Wrapper } from './TopicContainer.styled';
import TopicItem from './TopicItem';
import TopicListLoader from '@/components/loaders/TopicListLoader';
import Error from '@/components/general/Error';

const TopicContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const topicList = useAppSelector(selectTopicList);
  const { isLoading, error } = useAppSelector(selectFetchTopicsState);

  return (
    <Wrapper>
      <Header>Recommended topics</Header>
      <TopicList>
        {isLoading ? (
          <TopicListLoader />
        ) : error ? (
          <Error />
        ) : (
          topicList.map((topic) => <TopicItem key={topic._id} {...topic} />)
        )}
      </TopicList>
    </Wrapper>
  );
};

export default TopicContainer;
