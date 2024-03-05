import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { fetchTopics, selectTopicList, selectTopicsListState } from '../miscListSlice';

import TopicItem from './Topicitem';
import TopicListLoader from '@/components/loaders/TopicListLoader';
import Error from '@/components/general/Error';
import { Header, TopicList, Wrapper } from './TopicContainer.styled';

const MiscTopics = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const topicList = useAppSelector(selectTopicList);
  const { isLoading, error } = useAppSelector(selectTopicsListState);

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

export default MiscTopics;
