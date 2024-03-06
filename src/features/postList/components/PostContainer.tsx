import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileBookmarks } from '@/features/profile/profileSlice';
import {
  clearTopic,
  fetchPosts,
  selectFetchPostListState,
  selectPostList,
  selectSelectedTopic,
} from '../postListSlice';

import { Header, StyledIcon, Wrapper } from './PostContainer.styled';
import PostItem from './PostItem';
import Error from '@/components/general/Error';
import PostListLoader from '@/components/loaders/PostListLoader';
import { Topic } from '@/types/Topic';

const PostContainer = () => {
  const userBookmarks = useAppSelector(selectProfileBookmarks);

  const selectedTopic = useAppSelector(selectSelectedTopic) as Topic;

  const dispatch = useAppDispatch();

  const postList = useAppSelector(selectPostList);
  const { isLoading, error } = useAppSelector(selectFetchPostListState);

  useEffect(() => {
    dispatch(fetchPosts(selectedTopic?.name));
  }, [dispatch, selectedTopic]);

  const handleClearClick = (): void => {
    dispatch(clearTopic());
  };

  return (
    <Wrapper>
      {selectedTopic && (
        <Header>
          {selectedTopic.name}
          <StyledIcon onClick={handleClearClick} src="/close.svg" />
        </Header>
      )}
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
