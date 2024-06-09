import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.li)<{ $type: PushNotificationType }>(
  ({ $type }) => [
    tw`py-3 px-4 w-full border-none flex justify-between items-center absolute`,
    $type === 'success' && tw`bg-green-500`,
    $type === 'error' && tw`bg-red-500`,
    $type === 'warning' && tw`bg-yellow-400`,
  ],
);

export const MessageText = styled.p`
  ${tw`font-light`}
`;
