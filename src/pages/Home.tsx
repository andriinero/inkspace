import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import { Wrapper } from './Home.styled';

const Home = () => {
  return (
    <Wrapper>
      <PostContainer />
      <MiscContainer />
    </Wrapper>
  );
};

export default Home;
