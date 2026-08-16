import { useAppDispatch } from '@/app/hooks';

import {
  deleteFollowUser,
  postFollowUser,
} from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

const useFollowUserAction = (
  userId: string,
  isFollowed: boolean,
  isLoading: boolean = false,
) => {
  const dispatch = useAppDispatch();

  const handleFollowAction = async (): Promise<void> => {
    try {
      if (!isLoading) {
        isFollowed
          ? await dispatch(deleteFollowUser(userId)).unwrap()
          : await dispatch(postFollowUser(userId)).unwrap();
      }
    } catch (err) {
      dispatch(
        addPushNotification(
          (err as ErrorData).message,
          PushNotificationType.ERROR,
        ),
      );
    }
  };

  return handleFollowAction;
};

export default useFollowUserAction;
