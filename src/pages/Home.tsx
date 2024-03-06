import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import { Wrapper } from './Home.styled';
import { useAppDispatch } from '@/app/hooks';
import { clearTopic } from '@/features/postList/postListSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  dispatch(clearTopic());

  return (
    <Wrapper>
      <PostContainer />
      <MiscContainer />
    </Wrapper>
  );
};

export default Home;
