import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileBookmarks } from '@/features/profile/profileSlice';
import { fetchPosts, selectFetchPostListState, selectPostList } from '../postListSlice';

import { Wrapper } from './PostContainer.styled';
import PostItem from './PostItem';
import Error from '@/components/general/Error';
import PostListLoader from '@/components/loaders/PostListLoader';

const PostContainer = () => {
  const userBookmarks = useAppSelector(selectProfileBookmarks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const postList = useAppSelector(selectPostList);
  const { isLoading, error } = useAppSelector(selectFetchPostListState);

  return (
    <Wrapper>
      {isLoading ? (
        <PostListLoader />
      ) : error ? (
        <Error />
      ) : (
        postList.map((post) => {
          const isBookmarked = userBookmarks?.some((id) => id === post._id);

          return <PostItem isBookmarked={isBookmarked!} key={post._id} {...post} />;
        })
      )}
    </Wrapper>
  );
};

export default PostContainer;
