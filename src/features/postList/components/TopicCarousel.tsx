import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearTopic, selectSelectedTopic, setTopic } from '../postListSlice';
import { StyledCarouselContainer, StyledTabItem, Wrapper } from './TopicCarousel.styled';
import { selectMiscTopicList } from '@/features/miscList/miscListSlice';
import { TopicData } from '@/types/entityData/TopicData';

const TopicCarousel = () => {
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
      <StyledCarouselContainer>
        {topicsList.map((t) => {
          const isSelected = selectedTopic?._id === t._id;

          return (
            <StyledTabItem
              key={t._id}
              onItemClick={handleTopicClick(t, isSelected)}
              isSelected={isSelected}
            >
              {t.name}
            </StyledTabItem>
          );
        })}
      </StyledCarouselContainer>
    </Wrapper>
  );
};

export default TopicCarousel;
