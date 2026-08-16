import { useAppDispatch } from '@/app/hooks';
import useNotificationAutoDismiss from '../hooks/useNotificationAutoDismiss';

import { removePushNotification } from '../pushNotificationSlice';

import { PushNotificationData } from '@/types/entityData/StatusNotificationData';
import { PushFromTop } from '@/styles/animations/PushFromTop';

import {
  MessageText,
  StyledCloseButton,
  Wrapper,
} from './PushNotificationItem.styled';

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
      <StyledCloseButton $type={type} onClick={handleCloseClick} />
    </Wrapper>
  );
};

export default PushNotificationItem;
