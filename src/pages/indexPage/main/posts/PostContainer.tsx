import Post from '@/types/Post';

import { Wrapper } from './PostContainer.styled';
import PostItem from './PostItem';

type PostContainerProps = {
  posts: Post[];
};

const PostContainer = ({ posts }: PostContainerProps) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostItem key={post._id} {...post} />
      ))}
    </Wrapper>
  );
};

export default PostContainer;
