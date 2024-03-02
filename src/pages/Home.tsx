import PostContainer from '@/features/postList/:qa/PostContainer';
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
