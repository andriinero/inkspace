import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const Header = styled.h3`
  font-size: 1rem;
`;

export const BookmarkList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  list-style: none;
`;

export const CalloutText = styled.h4`
  font-style: italic;
  font-weight: 200;
`;
