import { TopicLink, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  _id: string;
  name: string;
};

const TopicItem = ({ _id, name }: TopicItemProps) => {
  return (
    <TopicLink to={`/topics/${_id}`}>
      <Wrapper>{name}</Wrapper>
    </TopicLink>
  );
};

export default TopicItem;
