import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';

import * as S from './PostHeaderInfo.styled';
import PostDate from '@/components/general/PostDate';

type PostAuthorProps = {
  author: Author;
  date: string;
  topic: Topic;
  bodyLength: number;
};

const PostHeaderInfo = ({ author, date, topic, bodyLength }: PostAuthorProps) => {
  return (
    <S.Wrapper>
      <S.ProfileIcon src="/portrait-placeholder.png" alt="Author Profile Picture" />
      <S.MainContainer>
        <S.PostLink to={`/users/${author._id}`}>
          <S.Name>{author.username}</S.Name>
        </S.PostLink>
        <S.Divider>·</S.Divider>
        <S.FollowButton
          onClick={() => {
            console.log('followed!');
          }}
          type="button"
          value="Follow"
        />
      </S.MainContainer>
      <S.MiscContainer>
        <S.TopicInfo>
          Published in
          <S.PostLink to={`/topics/${topic._id}`}>
            <S.TopicName> {topic.name}</S.TopicName>
          </S.PostLink>
        </S.TopicInfo>
        <S.Divider>·</S.Divider>
        <S.PostReadEstimate bodyLength={bodyLength} />
        <S.Divider>·</S.Divider>
        <PostDate date={date} />
      </S.MiscContainer>
    </S.Wrapper>
  );
};

export default PostHeaderInfo;
