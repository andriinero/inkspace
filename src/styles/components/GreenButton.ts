import { motion } from 'framer-motion';
import styled from 'styled-components';

export const GreenButton = styled(motion.input)`
  padding: 0.4rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.main_button_border_primary};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.main_button_bg_primary};

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 0.8rem;

  transition: color 200ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text_secondary};
  }
`;
