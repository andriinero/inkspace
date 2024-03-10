import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedTopic, setTopic } from '@/features/postList/postListSlice';

import { Topic } from '@/types/Topic';

import { TopicButton, Wrapper } from './TopicItem.styled';
import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';
type TopicItemProps = {
  _id: string;
  name: string;
};

const TopicItem = ({ _id, name }: TopicItemProps) => {
  const selectedTopic = useAppSelector(selectSelectedTopic);

  const dispatch = useAppDispatch();

  const handleTopicClick = (): void => {
    dispatch(setTopic({ _id, name } as Topic));
  };

  const isSelected = selectedTopic?._id === _id;

  return (
    <Wrapper variants={WaterfallPopUp.item}>
      <TopicButton
        $isActive={isSelected}
        onClick={handleTopicClick}
        type="button"
        value={name}
      />
    </Wrapper>
  );
};

export default TopicItem;
