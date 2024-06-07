import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import tw from 'twin.macro';

export const AppButton = styled(motion.button).attrs(({ disabled }) => ({
  whileTap: disabled ? '' : ButtonInteraction.whileTap.animation,
}))(({ disabled }) => [
  tw`cursor-pointer`,
  disabled && tw`opacity-60 cursor-not-allowed`,
]);
