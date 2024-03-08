import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchProfileBookmarks,
  selectFetchProfileBookmarksState,
  selectProfileBookmarksList,
} from '../profileSlice';

import { Wrapper } from './BookmarkContainer.styled';
import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';
import PostItem from '@/features/postList/components/PostItem';

const BookmarkContainer = () => {
  const bookmarkList = useAppSelector(selectProfileBookmarksList);
  const { isLoading, error } = useAppSelector(selectFetchProfileBookmarksState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileBookmarks());
  }, [dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        bookmarkList!.map((b) => {
          // TODO:  
          const isBookmarked = false;

          return <PostItem key={b._id} isBookmarked={isBookmarked} {...b} />;
        })
      )}
    </Wrapper>
  );
};

export default BookmarkContainer;
