import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

import { removeNotification } from '../statusNotificationSlice';

import { StatusNotificationData } from '@/types/entityData/StatusNotificationData';
import { PushFromTop } from '@/styles/animations/PushFromTop';

import { MessageWrapper, StyledAppIcon, Wrapper } from './StatusNotificationItem.styled';

const statusTypePrefixMap = {
  error: 'Error',
  warning: 'Warning',
  success: '',
};

const StatusNotificationItem = ({ id, message, type }: StatusNotificationData) => {
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
        {statusTypePrefixMap[type]}: {message}
      </MessageWrapper>
      <StyledAppIcon src="/close.svg" onClick={handleCloseClick} />
    </Wrapper>
  );
};

export default StatusNotificationItem;
