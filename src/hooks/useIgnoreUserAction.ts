import { useAppDispatch } from '@/app/hooks';

import {
  deleteIgnoredUser,
  postIgnoredUser,
} from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

const useIgnoreUserAction = (
  userId: string,
  isIgnored: boolean,
  isLoading: boolean = false,
) => {
  const dispatch = useAppDispatch();

  const handleIgnoreAction = async (): Promise<void> => {
    try {
      if (!isLoading) {
        isIgnored
          ? await dispatch(deleteIgnoredUser(userId)).unwrap()
          : await dispatch(postIgnoredUser(userId)).unwrap();
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

  return handleIgnoreAction;
};

export default useIgnoreUserAction;
