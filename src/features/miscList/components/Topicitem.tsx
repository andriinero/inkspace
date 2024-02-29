import { StyledLink, Wrapper } from './TopicItem.styled';

type TopicItemProps = {
  _id: string;
  name: string;
};

const TopicItem = ({ _id, name }: TopicItemProps) => {
  return (
    <StyledLink to={`/topics/${_id}`}>
      <Wrapper>{name}</Wrapper>
    </StyledLink>
  );
};

export default TopicItem;
