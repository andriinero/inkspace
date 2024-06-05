import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PostList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  list-style: none;
`;
