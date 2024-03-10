import { motion } from 'framer-motion';
import styled from 'styled-components';

export const HollowButton = styled(motion.input)<{ $isActive: boolean }>`
  align-self: flex-start;

  min-width: 11ch;
  padding: 0.6rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.topic_bg_selected : theme.color.topic_bg};

  color: ${({ $isActive: $isFollowed, theme }) =>
    $isFollowed ? theme.color.topic_text_selected : theme.color.text_primary};
  font-size: 0.85rem;

  transition: color 100ms;

  cursor: pointer;
`;
