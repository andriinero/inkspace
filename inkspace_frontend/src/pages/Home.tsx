import useHomePageStatus from '@/hooks/useHomeLoadingStatus';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';

import JumpButton from '@/components/general/JumpButton';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import PostContainer from '@/features/postList/components/PostContainer';
import TopicCarousel from '@/features/postList/components/TopicCarousel';
import { AnimatePresence } from 'framer-motion';
import { MainWrapper, Wrapper } from './Home.styled';

const Home = () => {
  const { isScrollingUp } = useWindowScrollDirection();

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
      <AnimatePresence>{isScrollingUp && <JumpButton />}</AnimatePresence>
    </Wrapper>
  );
};

export default Home;
