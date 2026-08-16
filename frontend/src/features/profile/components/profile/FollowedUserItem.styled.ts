import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppImage from '@/features/appImages/components/AppImage';
import tw from 'twin.macro';

export const WrapperItem = styled(motion.li)`
  ${tw`flex justify-between items-center p-2 sm:p-8`}
`;

export const StyledLink = styled(NavLink)`
  ${tw`shrink-0`}
`;

export const InfoWrapper = styled.div`
  ${tw`flex gap-8`}
`;

export const BioContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export const BioContent = styled.p`
  ${tw`line-clamp-2 max-w-[20ch] text-sm leading-tight text-ellipsis overflow-hidden`}
`;

export const AuthorIcon = styled(AppImage)`
  ${tw`self-start size-16 rounded-full select-none`}
`;
