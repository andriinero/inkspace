import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperBackdrop = styled(motion.div)<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  height: 100dvh;
  width: 100dvw;
  background-color: ${({ theme }) => theme.color.dialog_modal_bg};
`;

export const LoginWrapper = styled(motion.div)`
  padding: 2rem;
  border: none;
  background-color: ${({ theme }) => theme.color.dialog_backdrop_bg};
  box-shadow: 0 0 1em rgb(0 0 0 / 0.3);

  color: ${({ theme }) => theme.color.text_primary};
`;

export const CloseButton = styled.input``;
