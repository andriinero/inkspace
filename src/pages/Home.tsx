import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

import { clearTopic } from '@/features/postList/postListSlice';

import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import { Wrapper } from './Home.styled';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearTopic());
  }, [dispatch]);

  return (
    <Wrapper>
      <PostContainer />
      <MiscContainer />
    </Wrapper>
  );
};

export default Home;
