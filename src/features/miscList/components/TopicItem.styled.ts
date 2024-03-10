import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled(motion.li)<{ $isSelected: boolean }>`
  padding: 0.5rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.topic_bg_selected : theme.color.topic_bg};

  color: ${({ theme }) => theme.color.text_primary};

  cursor: pointer;
`;
