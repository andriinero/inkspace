import { useAppSelector } from '@/app/hooks';
import { selectNotificationQueue } from '../statusNotificationSlice';

import StatusNotificationItem from './StatusNotificationItem';
import { Wrapper } from './StatusNotificationContainer.styled';

const StatusNotificationContainer = () => {
  const notifications = useAppSelector(selectNotificationQueue);

  return (
    <Wrapper>
      {notifications.map((n) => (
        <StatusNotificationItem key={n.id} {...n} />
      ))}
    </Wrapper>
  );
};

export default StatusNotificationContainer;
