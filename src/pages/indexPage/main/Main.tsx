import Post from '@/types/Post';

import { WrapperMain } from './Main.styled';
import PostContainer from './PostContainer';

type MainProps = {
  posts: Post[];
};

const Main = ({ posts }: MainProps) => {
  return (
    <WrapperMain>
      <PostContainer posts={posts} />
    </WrapperMain>
  );
};

export default Main;
