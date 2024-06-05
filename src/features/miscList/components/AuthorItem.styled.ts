import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppImage from '@/features/appImages/components/AppImage';
import { HollowButton } from '@/components/styled/HollowButton';
import tw from 'twin.macro';

export const WrapperItem = styled(motion.li)`
  display: grid;
  grid-template-columns: auto minmax(100px, 300px) auto;
  justify-content: space-between;
  gap: 1.1rem;
`;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BioContent = styled.p`
  ${tw`line-clamp-2 text-sm font-light text-gray-700`}
`;

export const AuthorIcon = styled(AppImage)`
  align-self: flex-start;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  -webkit-user-drag: none;
`;

export const StyledHollowButton = styled(HollowButton)`
  ${tw`self-center`}
`;
