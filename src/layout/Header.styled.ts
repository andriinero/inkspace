import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GreenButton } from '@/styles/components/GreenButton';
import { motion } from 'framer-motion';
import AppIcon from '@/components/icons/AppIcon';

export const Wrapper = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: inherit;
  text-decoration: none;
`;

export const Logo = styled(motion.h1)`
  color: ${({ theme }) => theme.color.text_primary};
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;

  transition: color 200ms;

  user-select: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text_secondary};
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

export const ProfileIcon = styled.img`
  width: 32px;
  border-radius: 50%;

  cursor: pointer;
  -webkit-user-drag: none;
`;

export const HeaderButton = styled(GreenButton)``;
