import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { fetchTopics, selectTopicList, selectFetchTopicsState } from '../miscListSlice';

import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';

import TopicItem from './TopicItem';
import TopicListLoader from '@/components/loaders/TopicListLoader';
import Error from '@/components/general/Error';
import { Header, TopicList, Wrapper } from './TopicContainer.styled';

const TopicContainer = () => {
  const topicList = useAppSelector(selectTopicList);
  const { isLoading, error } = useAppSelector(selectFetchTopicsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <TopicListLoader />
      ) : error ? (
        <Error />
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
