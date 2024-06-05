import { useAppDispatch } from '@/app/hooks';

import { deleteBookmark, postBookmark } from '@/features/profile/profileSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

const useBookmarkPostAction = (
  postId: string,
  isBookmarked: boolean,
  isLoading: boolean = false,
) => {
  const dispatch = useAppDispatch();

  const handleBookmarkAction = async (): Promise<void> => {
    try {
      if (!isLoading) {
        isBookmarked
          ? await dispatch(deleteBookmark(postId)).unwrap()
          : await dispatch(postBookmark(postId)).unwrap();
      }
    } catch (err) {
      dispatch(
        addNotification((err as ErrorData).message, PushNotificationType.ERROR),
      );
    }
  };

  return handleBookmarkAction;
};

export default useBookmarkPostAction;
