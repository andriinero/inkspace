import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const GreenButton = styled(motion.input)<{ $isDisabled?: boolean }>`
  padding: 0.4rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.main_button_border_primary};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.main_button_bg_primary};

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 0.8rem;

  transition: color 200ms;
  opacity: ${({ $isDisabled }) => ($isDisabled ? '0.6' : '1')};

  cursor: ${({ $isDisabled }) => ($isDisabled ? 'normal' : 'pointer')};

  &:hover {
    ${({ $isDisabled }) =>
      $isDisabled
        ? 'none'
        : css`
            color: ${({ theme }) => theme.color.text_secondary};
          `}
  }
`;
