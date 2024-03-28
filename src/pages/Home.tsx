import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import { Wrapper } from './Home.styled';
import JumpButton from '@/components/general/JumpButton';

const Home = () => {
  return (
    <Wrapper>
      <PostContainer />
      <MiscContainer />
      <JumpButton />
    </Wrapper>
  );
};

export default Home;
