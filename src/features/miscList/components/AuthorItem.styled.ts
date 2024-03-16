import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppImage from '@/components/general/AppImage';

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
  gap: 0.4rem;
`;

export const BioContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  max-width: 20ch;

  font-size: 0.8rem;
  line-height: 1.2rem;
  text-overflow: ellipsis;

  overflow: hidden;
`;

export const AuthorIcon = styled(AppImage)`
  align-self: flex-start;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  -webkit-user-drag: none;
`;
