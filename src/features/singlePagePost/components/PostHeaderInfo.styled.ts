import styled from 'styled-components';
import PostReadTime from '@/components/general/PostReadTime';
import { NavLink } from 'react-router-dom';
import { Username } from '@/styles/components/Username.styled';
import { motion } from 'framer-motion';
import AppImage from '@/features/appImages/components/AppImage';

export const Wrapper = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas:
    'icon main'
    'icon misc';
  column-gap: 1rem;
`;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const AuthorStyledLink = styled(StyledLink)`
  grid-area: icon;
  display: flex;
  align-items: center;
`;

export const HeaderStyledLink = styled(StyledLink)`
  display: flex;
  align-items: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-size: 0.9rem;
  font-weight: 300;
`;

export const MainContainer = styled(InfoContainer)`
  grid-area: main;
`;

export const MiscContainer = styled(InfoContainer)`
  grid-area: misc;
`;

export const Divider = styled.span`
  font-size: 0.9rem;
`;

export const ProfileIcon = styled(AppImage)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const Name = styled(Username)`
  font-size: 0.9rem;
`;

export const TopicInfo = styled.span``;

export const TopicName = styled.strong`
  cursor: pointer;
`;

export const PostReadEstimate = styled(PostReadTime)``;

export const FollowButton = styled(motion.input)`
  border: 1px solid transparent;
  background-color: transparent;

  color: ${({ theme }) => theme.color.button_special_text};
  font-size: 1rem;
  text-align: center;

  cursor: pointer;
`;
