import { useAppSelector } from '@/app/hooks';

import {
  selectFetchProfileBookmarksState,
  selectFetchProfileDataState,
} from '@/features/profile/profileSlice';

const useProfilePageLoadingState = () => {
  const profileData = useAppSelector(selectFetchProfileDataState);
  const profileBookmarks = useAppSelector(selectFetchProfileBookmarksState);

  const isLoading = profileData.isLoading || profileBookmarks.isLoading;

  return isLoading;
};

export default useProfilePageLoadingState;
