import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GreenButton } from '@/components/styled/GreenButton';
import AppImage from '@/features/appImages/components/AppImage';
import Dropdown from '@/components/general/Dropdown';
import { MenuItem } from '@/components/styled/MenuItem';
import { Icon } from '@/components/styled/AppIcon.styled';

export const Wrapper = styled.header`
  grid-area: header;

  position: sticky;
  top: 0;
  z-index: 1;
`;

export const ContentWrapper = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.75rem 1.5rem;
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

  transition: filter 100ms;

  cursor: pointer;
  user-select: none;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;

export const StyledAppIcon = styled(Icon)`
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

export const StyledDropdown = styled(Dropdown)`
  margin-left: 0;
  margin-top: 45px;
`;

export const StyledMenuItem = styled(MenuItem)`
  justify-content: flex-start;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;

export const StyledProfileIcon = styled(Icon)`
  height: 20px;
  width: 20px;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 1.3rem;
`;

export const HeaderButton = styled(GreenButton)``;
