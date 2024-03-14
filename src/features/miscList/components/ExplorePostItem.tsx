import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';

import {
  AuthorIcon,
  Header,
  PostTitle,
  StyledLink,
  TopicName,
  TopicWrapper,
  WrapperItem,
} from './ExplorePostItem.styled';
import { AuthorName } from './BookmarkItem.styled';

type ExplorePostItemProps = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
};

const ExplorePostItem = ({ _id, author, title, topic }: ExplorePostItemProps) => {
  return (
    <WrapperItem>
      <Header>
        <StyledLink to={`/authors/${author._id}`}>
          <AuthorIcon src="/portrait-placeholder.png" alt="Author Icon" />
          <AuthorName>{author.username}</AuthorName>
          <TopicWrapper>
            in
            <TopicName>{topic.name}</TopicName>
          </TopicWrapper>
        </StyledLink>
      </Header>
      <PostTitle>{title}</PostTitle>
    </WrapperItem>
  );
};

export default ExplorePostItem;
