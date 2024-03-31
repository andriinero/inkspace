import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import { TopicButton, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  name: string;
};

const TopicItem = ({ name }: TopicItemProps) => {
  return (
    <Wrapper variants={WaterfallPopUp.item}>
      <TopicButton
        whileTap={ButtonInteraction.whileTap.animation}
        $isActive={false}
        type="button"
        value={name}
      />
    </Wrapper>
  );
};

export default TopicItem;
