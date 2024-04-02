import TabItem from '@/components/general/TabItem';
import { Icon } from '@/components/styled/AppIcon.styled';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2.5rem;
`;

export const StyledTabItem = styled(TabItem)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.9rem;
`;

export const StyledIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
