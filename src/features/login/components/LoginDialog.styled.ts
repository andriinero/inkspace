import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const SlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform:translateY(0);
  }
`;

export const Wrapper = styled(motion.dialog)`
  margin: auto;

  min-height: 400px;
  width: 300px;
  padding: 2rem;
  border: none;
  background-color: ${({ theme }) => theme.color.main_bg_primary};
  box-shadow: 0 0 1em rgb(0 0 0 / 0.3);

  color: ${({ theme }) => theme.color.text_primary};

  transition: opacity 100ms;

  &[open] {
    animation: ${SlideIn} 300ms;
  }

  &::backdrop {
    background-color: ${({ theme }) => theme.color.dialog_backdrop_bg};

    animation: ${FadeIn} 150ms ease-in;
  }
`;
