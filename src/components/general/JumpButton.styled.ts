import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;
  right: 0;

  padding: 0.7rem;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.main_bg_secondary};
`;
