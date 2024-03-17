import { setTopic } from '@/features/postList/postListSlice';
import { useAppDispatch } from '@/app/hooks';

import { PostAuthorData } from '@/types/itemData/PostAuthorData';
import { TopicData } from '@/types/itemData/TopicData';

import {
  AuthorIcon,
  Header,
  PostTitle,
  StyledLink,
  TopicName,
  TopicWrapper,
  WrapperItem,
  AuthorName,
} from './ExplorePostItem.styled';
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';

type ExplorePostItemProps = {
  _id: string;
  author: PostAuthorData;
  title: string;
  body: string;
  date: string;
  topic: TopicData;
};

const ExplorePostItem = ({ _id, author, title, topic }: ExplorePostItemProps) => {
  const dispatch = useAppDispatch();

  const handleTopicClick = (): void => {
    dispatch(setTopic(topic));
  };

  return (
    <WrapperItem variants={WaterfallSlideIn.item}>
      <Header>
        <StyledLink to={`/authors/${author._id}`}>
          <AuthorIcon imageId={author.profile_image} altText="Author Icon" />
          <AuthorName>{author.username}</AuthorName>
        </StyledLink>
        <TopicWrapper>
          in
          <TopicName onClick={handleTopicClick}>{topic.name}</TopicName>
        </TopicWrapper>
      </Header>
      <StyledLink to={`/posts/${_id}`}>
        <PostTitle>{title}</PostTitle>
      </StyledLink>
    </WrapperItem>
  );
};

export default ExplorePostItem;
