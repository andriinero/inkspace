import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col pt-4`}
`;

export const Header = styled.h1`
  ${tw`flex items-center self-end gap-4 pt-8 text-xl sm:text-2xl font-extralight`}
`;

export const PostList = styled(motion.ul)`
  ${tw`flex flex-col py-4`}
`;

export const StyledIcon = styled.img`
  ${tw`cursor-pointer transition w-4`}
`;
