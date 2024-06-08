import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppImage from '@/features/appImages/components/AppImage';
import { HollowButton } from '@/components/styled/HollowButton';
import tw from 'twin.macro';

export const WrapperItem = styled(motion.li)`
  ${tw`grid grid-cols-[auto,minmax(100px,300px),auto] justify-between gap-5`}
`;

export const StyledLink = styled(NavLink)``;

export const BioContainer = styled.div`
  ${tw`flex flex-col`}
`;

export const BioContent = styled.p`
  ${tw`line-clamp-2 text-sm font-light text-gray-700`}
`;

export const AuthorIcon = styled(AppImage)`
  ${tw`self-start size-8 rounded-full select-none`}
`;

export const StyledHollowButton = styled(HollowButton)`
  ${tw`self-center`}
`;
