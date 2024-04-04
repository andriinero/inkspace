import { TopicButton, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  name: string;
};

const TopicItem = ({ name }: TopicItemProps) => {
  return (
    <Wrapper>
      <TopicButton disabled={true} $isActive={false} type="button" value={name} />
    </Wrapper>
  );
};

export default TopicItem;
