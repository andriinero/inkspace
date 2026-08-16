import { useAppDispatch } from '@/app/hooks';

import { closeLoginModal, initAuth, postLogin } from '../authSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

const useGuestLogin = () => {
  const dispatch = useAppDispatch();

  const handleTestUserLogin = async (): Promise<void> => {
    const response = await dispatch(
      postLogin({ username: 'Max', password: 'guestpassword1' }),
    ).unwrap();

    if (response) {
      dispatch(
        addPushNotification('login success', PushNotificationType.SUCCESS),
      );
      dispatch(initAuth());
      dispatch(closeLoginModal());
    }
  };

  return handleTestUserLogin;
};

export default useGuestLogin;
