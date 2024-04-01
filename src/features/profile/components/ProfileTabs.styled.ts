import TabItem from '@/components/general/TabItem';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const StyledTabItem = styled(TabItem)`
  font-size: 0.9rem;
`;
