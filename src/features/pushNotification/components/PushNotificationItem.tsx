import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

import { removeNotification } from '../pushNotificationSlice';

import { PushNotificationData } from '@/types/entityData/StatusNotificationData';
import { PushFromTop } from '@/styles/animations/PushFromTop';

import { MessageWrapper, Notification } from './PushNotificationItem.styled';
import AppIcon from '@/components/general/AppIcon';
import { BsX } from 'react-icons/bs';

const statusTypePrefixMap = {
  error: 'Error: ',
  warning: 'Warning: ',
  success: 'Message: ',
};

const PushNotificationItem = ({ id, message, type }: PushNotificationData) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, 4000);
  }, [id, dispatch]);

  const handleCloseClick = (): void => {
    dispatch(removeNotification(id));
  };

  return (
    <Notification
      $type={type}
      key={id}
      initial={PushFromTop.hidden}
      animate={PushFromTop.visible}
      transition={PushFromTop.transition}
      exit={PushFromTop.hidden}
    >
      <MessageWrapper>
        {statusTypePrefixMap[type]}
        {message}.
      </MessageWrapper>
      <AppIcon onClick={handleCloseClick}>
        <BsX />
      </AppIcon>
    </Notification>
  );
};

export default PushNotificationItem;
