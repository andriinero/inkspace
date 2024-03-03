import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectBookmarks } from '@/features/profile/profileSlice';
import { fetchPosts, selectPostListState } from '../postListSlice';

import { Wrapper } from './PostContainer.styled';
import PostItem from './PostItem';
import Error from '@/components/general/Error';
import PostListLoader from '@/components/loaders/PostListLoader';

const PostContainer = () => {
  const userBookmarks = useAppSelector(selectBookmarks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { postList, isLoading, error } = useAppSelector(selectPostListState);

  return (
    <Wrapper>
      {isLoading ? (
        <PostListLoader />
      ) : error ? (
        <Error />
      ) : (
        postList.map((post) => {
          const isBookmarked = userBookmarks?.some((id) => id === post._id);

          return <PostItem isBookmarked={isBookmarked} key={post._id} {...post} />;
        })
      )}
    </Wrapper>
  );
};

export default PostContainer;
