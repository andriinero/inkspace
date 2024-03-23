import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchBookmarks,
  selectBookmarkList,
  selectFetchBookmarksState,
} from '../miscListSlice';

import { Waterfall } from '@/styles/animations/Waterfall';

import BookmarkItem from './BookmarkItem';
import Error from '@/components/general/Error';
import MiscListLoader from '@/components/loaders/MiscListLoader';
import { BookmarkList, CalloutText, Header, Wrapper } from './BookmarkContainer.styled';

const BookmarkContainer = () => {
  const bookmarkList = useAppSelector(selectBookmarkList);
  const { isLoading, error } = useAppSelector(selectFetchBookmarksState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <Error />
      ) : bookmarkList.length === 0 ? (
        <CalloutText>No bookmarks yet!</CalloutText>
      ) : (
        <>
          <Header>Recently Saved</Header>
          <BookmarkList variants={Waterfall.container} initial="hidden" animate="visible">
            {bookmarkList
              .slice(0)
              .reverse()
              .map((b) => (
                <BookmarkItem key={b._id} {...b} />
              ))}
          </BookmarkList>
        </>
      )}
    </Wrapper>
  );
};

export default BookmarkContainer;
