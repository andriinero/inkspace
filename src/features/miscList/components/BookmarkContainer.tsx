import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useHomePageStatus from '@/hooks/useHomeLoadingStatus';

import {
  fetchBookmarks,
  selectMiscBookmarkList,
  selectFetchMiscBookmarksState,
} from '../miscListSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { Waterfall } from '@/styles/animations/Waterfall';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import BookmarkItem from './BookmarkItem';
import MiscListLoader from '@/components/loaders/MiscListLoader';
import {
  BookmarkList,
  CalloutText,
  Header,
  Wrapper,
} from './BookmarkContainer.styled';

const BookmarkContainer = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const bookmarkList = useAppSelector(selectMiscBookmarkList);
  const isLoading = useHomePageStatus();
  const { error } = useAppSelector(selectFetchMiscBookmarksState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchBookmarks()).unwrap();
      } catch (err) {
        dispatch(
          addNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated, dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <MiscListLoader />
      ) : error ? (
        <MiscListLoader />
      ) : (
        <>
          <Header>Recently Saved</Header>
          {!isAuthenticated || bookmarkList.length === 0 ? (
            <CalloutText>No bookmarks yet!</CalloutText>
          ) : (
            <BookmarkList
              variants={Waterfall.container}
              initial="hidden"
              animate="visible"
            >
              {bookmarkList
                .slice(0)
                .reverse()
                .map((b) => (
                  <BookmarkItem key={b._id} {...b} />
                ))}
            </BookmarkList>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default BookmarkContainer;
