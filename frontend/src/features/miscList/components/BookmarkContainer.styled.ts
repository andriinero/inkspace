import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col gap-6`}
`;

export const StyledLink = styled(NavLink)``;

export const BookmarkList = styled(motion.ul)`
  ${tw`flex flex-col gap-8 list-none`}
`;

export const CalloutText = styled.h4`
  ${tw`italic font-light`}
`;
