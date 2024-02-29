import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  padding: 0.5rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.topic_bg};
`;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;
