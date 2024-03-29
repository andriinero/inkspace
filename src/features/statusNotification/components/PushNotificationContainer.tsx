import { useAppSelector } from '@/app/hooks';

import { selectFirstPushNotification } from '../pushNotificationSlice';

import { AnimatePresence } from 'framer-motion';
import PushNotificationItem from './PushNotificationItem';
import { Wrapper } from './PushNotificationContainer.styled';

const PushNotificationContainer = () => {
  const notification = useAppSelector(selectFirstPushNotification);

  return (
    <Wrapper>
      <AnimatePresence>
        {notification && <PushNotificationItem {...notification} />}
      </AnimatePresence>
    </Wrapper>
  );
};

export default PushNotificationContainer;
