import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Username } from '@/styles/components/Username.styled';
import { motion } from 'framer-motion';
import { Title } from '@/styles/components/Title.styled';

export const WrapperItem = styled(motion.li)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledLink = styled(NavLink)`
  margin-top: auto;

  color: inherit;
  text-decoration: none;
`;

export const AuthorIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;

export const AuthorName = styled(Username)`
  font-size: 0.8rem;
`;

export const BookmarkTitle = styled(Title)`
  margin-bottom: 0.4rem;

  font-size: 1rem;
`;

export const MiscInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  font-size: 0.8rem;
  font-weight: 300;
`;

export const Divider = styled.span`
  font-size: 1rem;
`;
