import { motion } from 'framer-motion';

import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`fixed top-0 z-30 w-dvw h-[3px] bg-gray-800`}
`;
