import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  padding: 3rem;
`;

export const LoginButton = styled.input`
  padding: 0.5rem 0.7rem;
  border: 1px solid transparent;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.main_button_bg};

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 1rem;

  cursor: pointer;
`;

export const LoginLink = styled(Link)`
  color: inherit;

  text-decoration: none;
`;
