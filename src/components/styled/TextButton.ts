import { motion } from 'framer-motion';
import styled from 'styled-components';

export const TextButton = styled(motion.input)`
  border: 1px solid transparent;
  background-color: transparent;

  color: ${({ theme }) => theme.color.success};
  font-size: 1rem;
  text-align: center;

  cursor: pointer;
`;
