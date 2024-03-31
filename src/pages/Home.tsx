import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useWindowScrollDirection from '@/hooks/useWindowScrollDirection';

import {
  clearTopic,
  selectSelectedTopic,
  setTopic,
} from '@/features/postList/postListSlice';
import { selectMiscTopicList } from '@/features/miscList/miscListSlice';

import PostContainer from '@/features/postList/components/PostContainer';
import MiscContainer from '@/features/miscList/components/MiscContainer';
import JumpButton from '@/components/general/JumpButton';
import CarouselContainer from '@/features/postList/components/carousel/CarouselContainer';
import TabItem from '@/components/general/TabItem';
import { AnimatePresence } from 'framer-motion';
import { MainWrapper, Wrapper } from './Home.styled';
import { TopicData } from '@/types/entityData/TopicData';

const Home = () => {
  const { isScrollingDown } = useWindowScrollDirection();

  const topicsList = useAppSelector(selectMiscTopicList);
  const selectedTopic = useAppSelector(selectSelectedTopic);

  const dispatch = useAppDispatch();

  const handleTopicClick = (topic: TopicData, isSelected: boolean) => () => {
    if (isSelected) {
      dispatch(clearTopic());
    } else {
      dispatch(setTopic(topic));
    }
  };

  return (
    <Wrapper>
      <MainWrapper>
        <CarouselContainer>
          {topicsList.map((t) => {
            const isSelected = selectedTopic?._id === t._id;

            return (
              <TabItem
                key={t._id}
                onItemClick={handleTopicClick(t, isSelected)}
                isSelected={isSelected}
              >
                {t.name}
              </TabItem>
            );
          })}
        </CarouselContainer>
        <PostContainer />
      </MainWrapper>
      <MiscContainer />
      <AnimatePresence>{isScrollingDown && <JumpButton />}</AnimatePresence>
    </Wrapper>
  );
};

export default Home;
