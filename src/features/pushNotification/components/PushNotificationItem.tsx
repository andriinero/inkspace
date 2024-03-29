import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

import { removeNotification } from '../pushNotificationSlice';

import { PushNotificationData } from '@/types/entityData/StatusNotificationData';
import { PushFromTop } from '@/styles/animations/PushFromTop';

import { MessageWrapper, StyledAppIcon, Wrapper } from './PushNotificationItem.styled';

const statusTypePrefixMap = {
  error: 'Error',
  warning: 'Warning',
  success: '',
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
    <Wrapper
      key={id}
      initial={PushFromTop.hidden}
      animate={PushFromTop.visible}
      transition={PushFromTop.transition}
      exit={PushFromTop.hidden}
    >
      <MessageWrapper>
        {statusTypePrefixMap[type]}: "{message}"
      </MessageWrapper>
      <StyledAppIcon src="/close.svg" onClick={handleCloseClick} />
    </Wrapper>
  );
};

export default PushNotificationItem;
