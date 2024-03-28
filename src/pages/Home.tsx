import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';

import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import JumpButton from '@/components/general/JumpButton';
import { AnimatePresence } from 'framer-motion';
import { Wrapper } from './Home.styled';

const Home = () => {
  const { isScrollingDown } = useWindowScrollDirection();

  return (
    <Wrapper>
      <PostContainer />
      <MiscContainer />
      <AnimatePresence>{isScrollingDown && <JumpButton />}</AnimatePresence>
    </Wrapper>
  );
};

export default Home;
