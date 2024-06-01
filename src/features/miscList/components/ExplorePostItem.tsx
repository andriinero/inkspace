import { useAppDispatch } from '@/app/hooks';

import { setTopic } from '@/features/postList/postListSlice';

import { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';
import { TopicData } from '@/types/entityData/TopicData';
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';

import * as S from './ExplorePostItem.styled';

type ExplorePostItemProps = {
  _id: string;
  author: GeneralAuthorData;
  title: string;
  body: string;
  date: string;
  topic: TopicData;
};

const ExplorePostItem = ({
  _id,
  author,
  title,
  topic,
}: ExplorePostItemProps) => {
  const dispatch = useAppDispatch();

  const handleTopicClick = (): void => {
    dispatch(setTopic(topic));
  };

  return (
    <S.WrapperItem variants={WaterfallSlideIn.item}>
      <S.Header>
        <S.StyledLink to={`/authors/${author._id}`}>
          <S.AuthorIcon imageId={author.profile_image} altText="Author Icon" />
          <S.AuthorName>{author.username}</S.AuthorName>
        </S.StyledLink>
        <S.TopicWrapper>
          in
          <S.TopicName onClick={handleTopicClick}>{topic.name}</S.TopicName>
        </S.TopicWrapper>
      </S.Header>
      <S.StyledLink to={`/posts/${_id}`}>
        <S.PostTitle>{title}</S.PostTitle>
      </S.StyledLink>
    </S.WrapperItem>
  );
};

export default ExplorePostItem;
