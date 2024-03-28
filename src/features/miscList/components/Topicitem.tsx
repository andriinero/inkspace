import { useAppSelector } from '@/app/hooks';

import { selectIsTopicSelected } from '@/features/postList/postListSlice';

import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import { TopicButton, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  _id: string;
  name: string;
};

const TopicItem = ({ _id, name }: TopicItemProps) => {
  const isSelected = useAppSelector(selectIsTopicSelected(_id));

  return (
    <Wrapper variants={WaterfallPopUp.item}>
      <TopicButton
        whileTap={ButtonInteraction.whileTap.animation}
        $isActive={isSelected}
        type="button"
        value={name}
      />
    </Wrapper>
  );
};

export default TopicItem;
