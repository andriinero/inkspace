import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchAuthors,
  selectAuthorList,
  selectFetchAuthorsState,
} from '../miscListSlice';

import { selectProfileFollowedUsers } from '@/features/profile/profileSlice';
import { WaterfallSlideIn } from '@/styles/animations/WaterfallSlideIn';

import AuthorItem from './AuthorItem';
import Error from '@/components/general/Error';
import MiscListLoader from '@/components/loaders/MiscListLoader';
import * as S from './AuthorContainer.styled';

const AuthorContainer = () => {
  const authorList = useAppSelector(selectAuthorList);
  const { isLoading, error } = useAppSelector(selectFetchAuthorsState);

  const followList = useAppSelector(selectProfileFollowedUsers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  return (
    <S.Wrapper>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <S.Header>Who to follow</S.Header>
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
        </>
      )}
    </S.Wrapper>
  );
};

export default AuthorContainer;
