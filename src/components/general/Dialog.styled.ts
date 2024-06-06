import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`flex justify-center items-center z-[2] w-dvw h-dvh fixed inset-0`}
`;

export const Backdrop = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.dialog_backdrop_bg};
`;
