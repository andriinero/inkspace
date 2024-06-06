import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  clearTopic,
  selectIsFollowingList,
  selectSelectedTopic,
  setIsFollowList,
  setTopic,
} from '../postListSlice';
import { selectMiscTopicList } from '@/features/miscList/miscListSlice';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

import { TopicData } from '@/types/entityData/TopicData';

import {
  ContentPadding,
  StyledCarouselContainer,
  StyledTabItem,
  Wrapper,
} from './TopicCarousel.styled';

const TopicCarousel = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const topicsList = useAppSelector(selectMiscTopicList);
  const selectedTopic = useAppSelector(selectSelectedTopic);
  const isFollowList = useAppSelector(selectIsFollowingList);

  const dispatch = useAppDispatch();

  const handleTopicClick = (topic: TopicData, isSelected: boolean) => () => {
    if (isSelected) {
      dispatch(clearTopic());
    } else {
      dispatch(setTopic(topic));
    }

    dispatch(setIsFollowList(false));
  };

  const handleFollowingClick = (): void => {
    isFollowList
      ? dispatch(setIsFollowList(false))
      : dispatch(setIsFollowList(true));

    dispatch(clearTopic());
  };

  return (
    <Wrapper>
      <StyledCarouselContainer>
        {isAuthenticated && (
          <StyledTabItem
            onItemClick={handleFollowingClick}
            isSelected={isFollowList}
          >
            Your Following
          </StyledTabItem>
        )}
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
      <ContentPadding />
    </Wrapper>
  );
};

export default TopicCarousel;
