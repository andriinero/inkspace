import { HollowButton } from '@/styles/components/HollowButton';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled(motion.li)``;

export const TopicButton = styled(HollowButton)`
  padding: 0.6rem 0.9rem;
  background-color: ${({  $isActive, theme }) =>
    $isActive ? theme.color.topic_bg_selected : theme.color.topic_bg};

  color: ${({ theme }) => theme.color.text_primary};
`;
