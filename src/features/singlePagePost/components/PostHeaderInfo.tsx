import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useFollowUserAction from '@/hooks/useFollowUserAction';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  selectFollowActionState,
  selectIsUserFollowed,
} from '@/features/profile/profileSlice';
import { setTopic } from '@/features/postList/postListSlice';

import { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';
import { TopicData } from '@/types/entityData/TopicData';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import PostDate from '@/components/general/TimeAgo';
import * as S from './PostHeaderInfo.styled';

type PostAuthorProps = {
  isAuthor: boolean;
  author: GeneralAuthorData;
  date: string;
  topic: TopicData;
  bodyLength: number;
};

const PostHeaderInfo = ({
  isAuthor,
  author,
  date,
  topic,
  bodyLength,
}: PostAuthorProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isFollowed = useAppSelector(
    selectIsUserFollowed(author._id),
  ) as boolean;

  const { isLoading } = useAppSelector(selectFollowActionState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTopicClick = (): void => {
    dispatch(setTopic(topic));
    navigate('/');
  };

  const handleFollowClick = useFollowUserAction(
    author._id,
    isFollowed,
    isLoading,
  );

  return (
    <S.Wrapper>
      <S.AuthorStyledLink to={`/authors/${author._id}`}>
        <S.ProfileIcon
          imageId={author.profile_image}
          placeholderSrc="/portrait-placeholder.png"
          altText="Author Icon"
        />
      </S.AuthorStyledLink>
      <S.MainContainer>
        <S.HeaderStyledLink to={`/authors/${author._id}`}>
          <S.Name>{author.username}</S.Name>
        </S.HeaderStyledLink>
        {isAuthenticated && !isAuthor && (
          <>
            <S.Divider>·</S.Divider>
            <S.FollowButton
              whileTap={ButtonInteraction.whileTap.animation}
              onClick={handleFollowClick}
              type="button"
              value={isFollowed ? 'Followed' : 'Follow'}
            />
          </>
        )}
      </S.MainContainer>
      <S.MiscContainer>
        <S.TopicInfo>
          Published in
          <S.TopicName onClick={handleTopicClick}> {topic.name}</S.TopicName>
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
