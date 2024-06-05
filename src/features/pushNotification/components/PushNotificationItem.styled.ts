import { Icon } from '@/components/styled/AppIcon.styled';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Notification = styled(motion.li)<{ $type: PushNotificationType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;

  padding: 0.7rem 1rem;
  width: 100%;
  border: none;
  background-color: ${({ theme, $type }) =>
    $type === 'error'
      ? theme.color.notification_danger
      : $type === 'success'
        ? theme.color.notification_success
        : theme.color.notification_warning};
`;

export const MessageWrapper = styled.p`
  color: ${({ theme }) => theme.color.text_primary};
  font-size: 1rem;
  font-weight: 300;
`;

export const StyledAppIcon = styled(Icon)`
  width: 18px;
  height: 18px;
`;
