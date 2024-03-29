import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled(motion.li)`
  position: absolute;

  padding: 1rem;
  background-color: ${({ theme }) => theme.color.text_danger};

  color: ${({ theme }) => theme.color.text_primary};
`;
