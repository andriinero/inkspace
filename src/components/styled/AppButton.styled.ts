import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const AppButton = styled(motion.input).attrs(({ disabled }) => ({
  whileTap: disabled ? '' : ButtonInteraction.whileTap.animation,
}))`
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  transition: 100ms color;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:hover {
    color: ${({ theme, disabled }) =>
      disabled ? '' : theme.color.text_primary};
  }
`;
