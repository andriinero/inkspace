import { Icon } from '@/components/icons/AppIcon.styled';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;

  padding: 0.7rem;
  width: 100%;
  border: none;
  background-color: ${({ theme }) => theme.color.text_danger};

  color: ${({ theme }) => theme.color.text_primary};
`;

export const MessageWrapper = styled.p``;

export const StyledAppIcon = styled(Icon)`
  width: 18px;
  height: 18px;
`;
