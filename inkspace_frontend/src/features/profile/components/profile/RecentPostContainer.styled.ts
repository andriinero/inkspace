import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div``;

export const PostsList = styled(motion.ul)`
  ${tw`flex flex-col gap-5`}
`;

export const CalloutText = styled.h4`
  ${tw`py-20 text-2xl text-center italic font-light`}
`;
