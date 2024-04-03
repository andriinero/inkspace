import styled from 'styled-components';
import AppImage from '@/features/appImages/components/AppImage';
import { NavLink } from 'react-router-dom';
import { Username } from '../styled/Username.styled';
import TimeAgo from './TimeAgo';

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;

  color: inherit;
  text-decoration: none;
`;

export const Head = styled.div`
  grid-area: head;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-weight: 300;
  font-size: 0.9rem;
`;

export const AuthorIcon = styled(AppImage)`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  -webkit-user-drag: none;
`;

export const StyledUsername = styled(Username)``;

export const StyledPostDate = styled(TimeAgo)``;

export const Divider = styled.span`
  font-size: 0.9rem;
`;
