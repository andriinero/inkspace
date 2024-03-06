import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { fetchAuthors, selectAuthorList, selectFetchAuthorsState } from '../miscListSlice';

import * as S from './AuthorContainer.styled';
import AuthorItem from './AuthorItem';
import Error from '@/components/general/Error';
import MiscListLoader from '@/components/loaders/MiscListLoader';

const AuthorContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const authorList = useAppSelector(selectAuthorList);
  const { isLoading, error } = useAppSelector(selectFetchAuthorsState);

  return (
    <S.Wrapper>
      <S.Header>Who to follow</S.Header>
      <S.AuthorList>
        {isLoading ? (
          <MiscListLoader />
        ) : error ? (
          <Error />
        ) : (
          authorList.map((author) => <AuthorItem key={author._id} {...author} />)
        )}
      </S.AuthorList>
    </S.Wrapper>
  );
};

export default AuthorContainer;
