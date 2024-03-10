import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchAuthors,
  selectAuthorList,
  selectFetchAuthorsState,
} from '../miscListSlice';

import * as S from './AuthorContainer.styled';
import AuthorItem from './AuthorItem';
import Error from '@/components/general/Error';
import MiscListLoader from '@/components/loaders/MiscListLoader';
import { selectProfileFollowedUsers } from '@/features/profile/profileSlice';
import { WaterfallSlideIn } from '@/styles/components/animations/WaterfallSlideIn';

const AuthorContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const followList = useAppSelector(selectProfileFollowedUsers);

  const authorList = useAppSelector(selectAuthorList);
  const { isLoading, error } = useAppSelector(selectFetchAuthorsState);

  return (
    <S.Wrapper>
      <S.Header>Who to follow</S.Header>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <Error />
      ) : (
        <S.AuthorList
          variants={WaterfallSlideIn.container}
          initial="hidden"
          animate="visible"
        >
          {authorList.map((a) => {
            const isFollowed = followList?.some((f) => f === a._id) as boolean;

            return <AuthorItem key={a._id} isFollowed={isFollowed} {...a} />;
          })}
        </S.AuthorList>
      )}
    </S.Wrapper>
  );
};

export default AuthorContainer;
