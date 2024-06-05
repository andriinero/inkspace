import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Username } from '@/components/styled/Username.styled';
import { motion } from 'framer-motion';
import { Title } from '@/components/styled/Title.styled';
import AppImage from '@/features/appImages/components/AppImage';
import tw from 'twin.macro';

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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: inherit;
  text-decoration: none;
`;

export const AuthorIcon = styled(AppImage)`
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;

export const AuthorName = styled(Username)`
  font-size: 0.8rem;
`;

export const TopicWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.8rem;
  font-weight: 300;
`;

export const TopicName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;

  cursor: pointer;
`;

export const PostTitle = styled(Title)`
  ${tw`font-bold`}
`;
