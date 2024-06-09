import { useAppDispatch } from '@/app/hooks';

import { removeNotification } from '../pushNotificationSlice';

import { PushNotificationData } from '@/types/entityData/StatusNotificationData';
import { PushFromTop } from '@/styles/animations/PushFromTop';

import { MessageText, Wrapper } from './PushNotificationItem.styled';
import AppIcon from '@/components/general/AppIcon';
import { BsX } from 'react-icons/bs';
import useNotificationAutoDismiss from '../hooks/useNotificationAutoDismiss';

const statusTypePrefixMap = {
  error: 'Error: ',
  warning: 'Warning: ',
  success: 'Message: ',
};

const PushNotificationItem = ({ id, message, type }: PushNotificationData) => {
  useNotificationAutoDismiss(id);

  const dispatch = useAppDispatch();

  const handleCloseClick = (): void => {
    dispatch(removeNotification(id));
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
      <MessageText>
        {statusTypePrefixMap[type]}
        {message}.
      </MessageText>
      <AppIcon onClick={handleCloseClick}>
        <BsX />
      </AppIcon>
    </Wrapper>
  );
};

export default PushNotificationItem;
