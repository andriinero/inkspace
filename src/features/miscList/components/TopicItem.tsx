import { TopicButton, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  name: string;
};

const TopicItem = ({ name }: TopicItemProps) => {
  return (
    <Wrapper>
      <TopicButton isActive={false}>{name}</TopicButton>
    </Wrapper>
  );
};

export default TopicItem;
