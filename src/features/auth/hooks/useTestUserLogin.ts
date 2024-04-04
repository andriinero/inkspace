import { useAppDispatch } from '@/app/hooks';

import { closeLoginModal, initAuth, postLogin } from '../authSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

const useTestUserLogin = () => {
  const dispatch = useAppDispatch();

  const handleTestUserLogin = async (): Promise<void> => {
    const response = await dispatch(
      postLogin({ username: 'Max', password: 'guestpassword1' })
    ).unwrap();

    if (response) {
      dispatch(addNotification('login success', PushNotificationType.SUCCESS));
      dispatch(initAuth());
      dispatch(closeLoginModal());
    }
  };

  return handleTestUserLogin;
};

export default useTestUserLogin;
