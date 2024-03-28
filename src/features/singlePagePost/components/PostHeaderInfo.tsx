import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  deleteFollowUser,
  postFollowUser,
  selectFollowActionState,
  selectProfileFollowedUsers,
} from '@/features/profile/profileSlice';

import { GeneralAuthorData } from '@/types/entityData/GeneralAuthorData';
import { TopicData } from '@/types/entityData/TopicData';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import PostDate from '@/components/general/TimeAgo';
import * as S from './PostHeaderInfo.styled';
import { setTopic } from '@/features/postList/postListSlice';
import { useNavigate } from 'react-router-dom';

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

  const followList = useAppSelector(selectProfileFollowedUsers);
  const followActionState = useAppSelector(selectFollowActionState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFollowAdd = (): void => {
    if (!followActionState.isLoading) dispatch(postFollowUser(author._id));
  };

  const handleFollowRemove = (): void => {
    if (!followActionState.isLoading) dispatch(deleteFollowUser(author._id));
  };

  const handleTopicClick = (): void => {
    dispatch(setTopic(topic));
    navigate('/');
  };

  const isFollowed = followList?.some((f) => f === author._id);

  const followButtonText = isFollowed ? 'Followed' : 'Follow';
  const handleFollowClick = isFollowed ? handleFollowRemove : handleFollowAdd;

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
              value={followButtonText}
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
