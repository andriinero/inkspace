import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GreenButton } from '@/styles/components/GreenButton';
import AppIcon from '@/components/icons/AppIcon';
import AppImage from '@/features/appImages/components/AppImage';

export const Wrapper = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 1;

  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.main_border};
  background-color: ${({ theme }) => theme.color.main_bg_primary};
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: inherit;
  text-decoration: none;
`;

export const Logo = styled(motion.img)`
  height: 22px;

  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;

  transition: color 200ms;

  &:hover {
    filter: invert(0) sepia(0) saturate(0%) hue-rotate(198deg) brightness(101%)
      contrast(124%);
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const NewPostButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  transition: filter 100ms;

  cursor: pointer;
  user-select: none;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;

export const StyledAppIcon = styled(AppIcon)`
  &:hover {
    filter: none;
  }
`;

export const NewPostButtonText = styled.span`
  margin-left: 0.5rem;

  font-size: 0.9rem;
  font-weight: 300;
`;

export const ProfileIcon = styled(AppImage)`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  cursor: pointer;
  -webkit-user-drag: none;
`;

export const HeaderButton = styled(GreenButton)``;
