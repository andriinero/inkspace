import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col justify-center gap-6`}
`;

export const TopicList = styled(motion.ul)`
  ${tw`flex flex-wrap gap-4 list-none`}
`;
