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

import { Topic } from '@/types/Topic';

import {
  CalloutText,
  Header,
  PostList,
  StyledIcon,
  Wrapper,
} from './PostContainer.styled';
import PostItem from './PostItem';
import Error from '@/components/general/Error';
import PostListLoader from '@/components/loaders/PostListLoader';
import { Waterfall } from '@/lib/appAnimate';

const PostContainer = () => {
  const userBookmarks = useAppSelector(selectProfileBookmarks);

  const selectedTopic = useAppSelector(selectSelectedTopic) as Topic;

  const dispatch = useAppDispatch();

  const postList = useAppSelector(selectPostList);
  const { isLoading, error } = useAppSelector(selectFetchPostListState);

  useEffect(() => {
    dispatch(fetchPosts(selectedTopic?._id));
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
      ) : postList.length === 0 ? (
        <CalloutText>Be the first one to post!</CalloutText>
      ) : (
        <PostList variants={Waterfall.container} initial="hidden" animate="visible">
          {postList.map((post) => {
            const isBookmarked = userBookmarks?.some((id) => id === post._id) as boolean;

            return <PostItem isBookmarked={isBookmarked} key={post._id} {...post} />;
          })}
        </PostList>
      )}
    </Wrapper>
  );
};

export default PostContainer;
