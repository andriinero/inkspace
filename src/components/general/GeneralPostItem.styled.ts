import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppImage from '@/features/appImages/components/AppImage';
import PostTopic from './PostTopic';
import { TextButton } from '../styled/TextButton';

export const WrapperItem = styled(motion.li)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  border-radius: 6px;
  border-bottom: 1px solid ${({ theme }) => theme.color.main_border_feint};

  &:last-child {
    border-bottom: 1px solid transparent;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
`;

export const Header = styled.h2``;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.7rem;

  padding: 1rem;
`;

export const StyledPostTopic = styled(PostTopic)``;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const MiscWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 1rem;
`;

export const PreviewImage = styled(AppImage)`
  width: 128px;
  height: 78px;
  border-radius: 6px;
  object-fit: cover;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 2rem;
`;

export const EditButton = styled(TextButton)``;

export const DeleteButton = styled(TextButton)`
  color: ${({ theme }) => theme.color.danger};
`;
