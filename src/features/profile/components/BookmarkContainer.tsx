import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchProfileBookmarks,
  selectFetchProfileBookmarksState,
  selectProfileBookmarksList,
  selectProfileData,
} from '../profileSlice';

import { Wrapper } from './BookmarkContainer.styled';
import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';
import PostItem from '@/features/postList/components/PostItem';

const BookmarkContainer = () => {
  const profileData = useAppSelector(selectProfileData);

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
          const isBookmarked = profileData?.post_bookmarks.some(
            (userB) => userB === b._id
          ) as boolean;

          return <PostItem key={b._id} isBookmarked={isBookmarked} {...b} />;
        })
      )}
    </Wrapper>
  );
};

export default BookmarkContainer;
