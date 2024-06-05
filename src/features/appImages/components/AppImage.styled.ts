import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Image = styled(motion.img)`
  user-select: none;
  -webkit-user-drag: none;
  object-fit: cover;
`;

export const BlankPlaceholder = styled.div``;
