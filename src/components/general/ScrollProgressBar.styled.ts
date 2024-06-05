import { motion } from 'framer-motion';

import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  z-index: 2;

  width: 99dvw;
  height: 3px;
  background-color: ${({ theme }) => theme.color.progress_scrollbar_bg};
`;
