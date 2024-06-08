import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Image = styled(motion.img)`
  ${tw`select-none object-cover`}
`;

export const BlankPlaceholder = styled.div``;
