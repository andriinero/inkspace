import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPosts, selectPostListState } from '../postListSlice';

import { Wrapper } from './PostContainer.styled';
import PostItem from './PostItem';
import Spinner from '@/components/general/Spinner';
import Error from '@/components/general/Error';

const PostContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { postList, isLoading, error } = useAppSelector(selectPostListState);

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        postList.map((post) => <PostItem key={post._id} {...post} />)
      )}
    </Wrapper>
  );
};

export default PostContainer;
