import { useAppSelector } from '@/app/hooks';

import {
  selectFetchAuthorPostsState,
  selectFetchAuthorDataState,
} from '@/features/authorPage/authorPageSlice';

const useAuthorPageLoadingState = () => {
  const authorData = useAppSelector(selectFetchAuthorDataState);
  const postList = useAppSelector(selectFetchAuthorPostsState);

  const isLoading = authorData.isLoading || postList.isLoading;

  return isLoading;
};

export default useAuthorPageLoadingState;
