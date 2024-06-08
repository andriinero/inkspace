import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col gap-6`}
`;

export const PostList = styled(motion.ul)`
  ${tw`flex flex-col gap-6 list-none`}
`;
