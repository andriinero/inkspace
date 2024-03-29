import { StatusNotificationData } from '@/types/entityData/StatusNotificationData';
import { Wrapper } from './StatusNotificationItem.styled';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { removeNotification } from '../statusNotificationSlice';

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

  return (
    <Wrapper>
      {statusTypePrefixMap[type]}: {message}
    </Wrapper>
  );
};

export default StatusNotificationItem;
