import AppIcon from '@/components/general/AppIcon';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.li)<{ $type: PushNotificationType }>(
  ({ $type }) => [
    tw`py-3 px-4 w-full flex justify-between items-center rounded-md shadow-md bg-white border border-gray-200`,
    // $type && tw`border-none`,
    // $type === 'success' && tw`bg-green-50 text-green-700`,
    // $type === 'error' && tw`bg-red-50 text-red-700`,
    // $type === 'warning' && tw`bg-yellow-50 text-yellow-700`,
  ],
);

export const MessageText = styled.p`
  ${tw``}
`;

export const CrossIcon = styled(AppIcon)<{ $type: PushNotificationType }>(
  ({ $type }) => [
    // $type === 'success' && tw`hover:bg-green-50 text-green-700`,
    // $type === 'error' && tw`hover:bg-red-50 text-red-700`,
    // $type === 'warning' && tw`hover:bg-yellow-50 text-yellow-700`,
  ],
);
