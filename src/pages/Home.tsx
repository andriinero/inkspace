import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';

import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import JumpButton from '@/components/general/JumpButton';
import { AnimatePresence } from 'framer-motion';
import { MainWrapper, Wrapper } from './Home.styled';
import CarouselContainer from '@/features/postList/components/carousel/CarouselContainer';
import CarouselItem from '@/features/postList/components/carousel/CarouselItem';

const Home = () => {
  const { isScrollingDown } = useWindowScrollDirection();

  return (
    <Wrapper>
      <MainWrapper>
        <CarouselContainer>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </CarouselContainer>
        <PostContainer />
      </MainWrapper>
      <MiscContainer />
      <AnimatePresence>{isScrollingDown && <JumpButton />}</AnimatePresence>
    </Wrapper>
  );
};

export default Home;
