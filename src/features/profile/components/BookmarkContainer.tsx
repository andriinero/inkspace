import { useAppSelector } from '@/app/hooks';

import {
  selectFetchProfileBookmarksState,
  selectProfileBookmarksList,
} from '../profileSlice';

import { Waterfall } from '@/styles/animations/Waterfall';

import Error from '@/components/general/Error';
import PostItem from '@/components/general/PostItem';
import PostListLoader from '@/components/loaders/PostListLoader';
import { BookmarkList, CalloutText, Wrapper } from './BookmarkContainer.styled';

const BookmarkContainer = () => {
  const bookmarkList = useAppSelector(selectProfileBookmarksList);
  const { isLoading, error } = useAppSelector(selectFetchProfileBookmarksState);

  return (
    <Wrapper>
      {isLoading ? (
        <PostListLoader />
      ) : error ? (
        <Error />
      ) : bookmarkList.length === 0 ? (
        <CalloutText>No bookmarks yet!</CalloutText>
      ) : (
        <BookmarkList variants={Waterfall.container} initial="hidden" animate="visible">
          {bookmarkList.map((b) => (
            <PostItem key={b._id} {...b} />
          ))}
        </BookmarkList>
      )}
    </Wrapper>
  );
};

export default BookmarkContainer;
