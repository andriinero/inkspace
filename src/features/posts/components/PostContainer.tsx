import { useIndexPosts } from '@/hooks/api/useIndexPosts';

import { Wrapper } from './PostContainer.styled';
import PostItem from './PostItem';
import Spinner from '@/components/general/Spinner';
import Error from '@/components/general/Error';

const PostContainer = () => {
  const { posts, loading, error } = useIndexPosts();

  return (
    <Wrapper>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        posts.map((post) => <PostItem key={post._id} {...post} />)
      )}
    </Wrapper>
  );
};

export default PostContainer;
