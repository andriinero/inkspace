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
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';

const ExplorePostContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMiscPosts());
  }, [dispatch]);

  const postList = useAppSelector(selectMiscPostList);
  const { isLoading, error } = useAppSelector(selectFetchMiscPostsState);

  return (
    <Wrapper>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <Header>Explore new posts</Header>
          <PostList initial={WaterfallSlideIn.container.visible}>
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
