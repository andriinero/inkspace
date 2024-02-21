import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { useEffect } from 'react';
import { fetchTopics, selectTopicsListState } from '../miscListSlice';
import TopicItem from './Topicitem';
import Spinner from '@/components/general/Spinner';
import Error from '@/components/general/Error';
import { Header, TopicList, Wrapper } from './TopicContainer.styled';

const MiscTopics = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const { topicList, isLoading, error } = useAppSelector(selectTopicsListState);

  return (
    <Wrapper>
      <Header>Recommended topics</Header>
      <TopicList>
        {isLoading ? (
          <Spinner />
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
