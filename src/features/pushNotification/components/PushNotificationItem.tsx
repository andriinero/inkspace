import { useAppDispatch } from '@/app/hooks';
import useNotificationAutoDismiss from '../hooks/useNotificationAutoDismiss';

import { removePushNotification } from '../pushNotificationSlice';

import { PushNotificationData } from '@/types/entityData/StatusNotificationData';
import { PushFromTop } from '@/styles/animations/PushFromTop';

import { CrossIcon, MessageText, Wrapper } from './PushNotificationItem.styled';
import { BsX } from 'react-icons/bs';

const PushNotificationItem = ({ id, message, type }: PushNotificationData) => {
  useNotificationAutoDismiss(id);

  const dispatch = useAppDispatch();

  const handleCloseClick = (): void => {
    dispatch(removePushNotification(id));
  };

  return (
    <Wrapper
      $type={type}
      key={id}
      initial={PushFromTop.hidden}
      animate={PushFromTop.visible}
      transition={PushFromTop.transition}
      exit={PushFromTop.hidden}
    >
      <MessageText>{message}</MessageText>
      <CrossIcon $type={type} onClick={handleCloseClick}>
        <BsX size="1.25rem" />
      </CrossIcon>
    </Wrapper>
  );
};

export default PushNotificationItem;
