import { useAppSelector } from '@/app/hooks';

import {
  selectFetchMiscAuthorsState,
  selectFetchMiscBookmarksState,
  selectFetchMiscPostsState,
  selectFetchMiscTopicsState,
} from '@/features/miscList/miscListSlice';
import { selectFetchPostListState } from '@/features/postList/postListSlice';

const useHomePageStatus = () => {
  const postList = useAppSelector(selectFetchPostListState);

  const miscPosts = useAppSelector(selectFetchMiscPostsState);
  const miscAuthors = useAppSelector(selectFetchMiscAuthorsState);
  const miscTopics = useAppSelector(selectFetchMiscTopicsState);
  const miscBookmarks = useAppSelector(selectFetchMiscBookmarksState);

  const isLoading =
    postList.isLoading ||
    miscPosts.isLoading ||
    miscAuthors.isLoading ||
    miscTopics.isLoading ||
    miscBookmarks.isLoading;

  return isLoading;
};

export default useHomePageStatus;
