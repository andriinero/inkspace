import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';

import { removePushNotification } from '../pushNotificationSlice';

const NOTIFICATION_DISMISS_TIMER = 4000;

const useNotificationAutoDismiss = (id: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removePushNotification(id));
    }, NOTIFICATION_DISMISS_TIMER);
  }, [id, dispatch]);

  return null;
};

export default useNotificationAutoDismiss;
