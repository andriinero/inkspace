import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchProfileBookmarks,
  selectFetchProfileBookmarksState,
  selectProfileBookmarksList,
  selectProfileData,
} from '../profileSlice';

import { BookmarkList, Wrapper } from './BookmarkContainer.styled';
import Error from '@/components/general/Error';
import PostItem from '@/features/postList/components/PostItem';
import PostListLoader from '@/components/loaders/PostListLoader';
import { Waterfall } from '@/styles/animations/Waterfall';

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
        <PostListLoader />
      ) : error ? (
        <Error />
      ) : (
        <BookmarkList variants={Waterfall.container} initial="hidden" animate="visible">
          {bookmarkList.map((b) => {
            const isBookmarked = profileData?.post_bookmarks.some(
              (userB) => userB === b._id
            ) as boolean;

            return <PostItem key={b._id} isBookmarked={isBookmarked} {...b} />;
          })}
        </BookmarkList>
      )}
    </Wrapper>
  );
};

export default BookmarkContainer;
