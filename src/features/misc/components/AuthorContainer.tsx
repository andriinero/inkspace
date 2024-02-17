import { useAppDispatch, useAppSelector } from '@/app/hooks';
import * as S from './AuthorContainer.styled';
import AuthorItem from './AuthorItem';
import { useEffect } from 'react';
import { fetchAuthors, selectAuthorListState } from '../miscListSlice';
import Spinner from '@/components/general/Spinner';
import Error from '@/components/general/Error';

const AuthorContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const { authorList, isLoading, error } = useAppSelector(selectAuthorListState);

  return (
    <S.Wrapper>
      <S.Header>Who to follow</S.Header>
      <S.AuthorList>
        {isLoading ? (
          <Spinner />
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
