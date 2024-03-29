import { useAppSelector } from '@/app/hooks';
import { selectNotificationQueue } from '../statusNotificationSlice';

import StatusNotificationItem from './StatusNotificationItem';
import { Wrapper } from './StatusNotificationContainer.styled';
import { AnimatePresence } from 'framer-motion';

const StatusNotificationContainer = () => {
  const notifications = useAppSelector(selectNotificationQueue);

  return (
    <Wrapper>
      <AnimatePresence>
        {notifications.map((n) => (
          <StatusNotificationItem key={n.id} {...n} />
        ))}
      </AnimatePresence>
    </Wrapper>
  );
};

export default StatusNotificationContainer;
