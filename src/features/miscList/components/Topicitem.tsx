import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectSelectedTopic, setTopic } from '@/features/postList/postListSlice';

import { TopicData } from '@/types/entityData/TopicData';

import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import { TopicButton, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  _id: string;
  name: string;
};

const TopicItem = ({ _id, name }: TopicItemProps) => {
  const selectedTopic = useAppSelector(selectSelectedTopic);

  const dispatch = useAppDispatch();

  const handleTopicClick = (): void => {
    dispatch(setTopic({ _id, name } as TopicData));
  };

  const isSelected = selectedTopic?._id === _id;

  return (
    <Wrapper variants={WaterfallPopUp.item}>
      <TopicButton
        whileTap={ButtonInteraction.whileTap.animation}
        $isActive={isSelected}
        onClick={handleTopicClick}
        type="button"
        value={name}
      />
    </Wrapper>
  );
};

export default TopicItem;
