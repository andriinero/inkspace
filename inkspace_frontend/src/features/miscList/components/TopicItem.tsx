import { TopicButton, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  name: string;
};

const TopicItem = ({ name }: TopicItemProps) => {
  return (
    <Wrapper>
      <TopicButton $isActive>{name}</TopicButton>
    </Wrapper>
  );
};

export default TopicItem;
