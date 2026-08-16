import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`flex justify-center items-center z-20 w-dvw h-dvh fixed inset-0`}
`;

export const ContentWrapper = styled.div`
  ${tw`flex justify-center items-center z-30`}
`;

export const Backdrop = styled(Wrapper)`
  ${tw`bg-gray-800 opacity-20 z-20`}
`;
