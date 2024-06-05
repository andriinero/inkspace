import useHomePageStatus from '@/hooks/useHomeLoadingStatus';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';

import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import JumpButton from '@/components/general/JumpButton';
import { AnimatePresence } from 'framer-motion';
import TopicCarousel from '@/features/postList/components/TopicCarousel';
import { MainWrapper, Wrapper } from './Home.styled';

const Home = () => {
  const { isScrollingDown } = useWindowScrollDirection();

  const isLoading = useHomePageStatus();

  return (
    <Wrapper>
      <MainWrapper>
        {!isLoading && (
          <>
            <TopicCarousel />
            <PostContainer />
          </>
        )}
      </MainWrapper>
      <MiscContainer />
      <AnimatePresence>{isScrollingDown && <JumpButton />}</AnimatePresence>
    </Wrapper>
  );
};

export default Home;
