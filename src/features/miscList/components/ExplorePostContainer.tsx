import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchMiscPosts,
  selectFetchMiscPostsState,
  selectMiscPostList,
} from '../miscListSlice';

import MiscListLoader from '@/components/loaders/MiscListLoader';
import Error from '@/components/general/Error';
import ExplorePostItem from './ExplorePostItem';
import { Header, PostList, Wrapper } from './ExplorePostContainer.styled';

const ExplorePostContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMiscPosts());
  }, [dispatch]);

  const postList = useAppSelector(selectMiscPostList);
  const { isLoading, error } = useAppSelector(selectFetchMiscPostsState);

  return (
    <Wrapper>
      <Header>Explore new posts</Header>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <Error />
      ) : (
        <PostList>
          {postList.map((p) => (
            <ExplorePostItem key={p._id} {...p} />
          ))}
        </PostList>
      )}
    </Wrapper>
  );
};
export default ExplorePostContainer;
