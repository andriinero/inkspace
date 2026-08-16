import { FadeInSlide } from '@/styles/animations/FadeInSlide';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const CalloutText = styled(motion.h2).attrs(() => ({
  initial: FadeInSlide.hidden,
  animate: FadeInSlide.visible,
  transition: FadeInSlide.transition,
}))`
  ${tw`self-center mt-64 text-xl font-extralight italic tracking-wider`}
`;
