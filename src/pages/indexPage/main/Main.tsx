import Post from '@/types/Post';

import { WrapperMain } from './Main.styled';
import PostContainer from './posts/PostContainer';
import MiscContainer from './misc/MiscContainer';

type MainProps = {
  posts: Post[];
};

const Main = ({ posts }: MainProps) => {
  return (
    <WrapperMain>
      <PostContainer posts={posts} />
      <MiscContainer />
    </WrapperMain>
  );
};

export default Main;
