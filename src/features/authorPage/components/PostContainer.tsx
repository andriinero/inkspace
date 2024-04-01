import { useAppSelector } from '@/app/hooks';

import { selectAuthorPosts, selectFetchAuthorPostsState } from '../authorPageSlice';

import { Waterfall } from '@/styles/animations/Waterfall';

import Error from '@/components/general/Error';
import PostItem from '@/components/general/PostItem';
import PostListLoader from '@/components/loaders/PostListLoader';
import { PostList, Wrapper } from './PostContainer.styled';

const PostContainer = () => {
  const postList = useAppSelector(selectAuthorPosts);
  const { isLoading, error } = useAppSelector(selectFetchAuthorPostsState);

  return (
    <Wrapper>
      {isLoading ? (
        <PostListLoader />
      ) : error ? (
        <Error />
      ) : (
        <PostList variants={Waterfall.container} initial="hidden" animate="visible">
          {postList.map((p) => (
            <PostItem key={p._id} {...p} />
          ))}
        </PostList>
      )}
    </Wrapper>
  );
};

export default PostContainer;
