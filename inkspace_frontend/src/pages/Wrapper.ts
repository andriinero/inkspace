import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`grid grid-cols-[minmax(50ch,80ch)minmax(30ch,40ch)] justify-center gap-16 min-h-full`}
`;
