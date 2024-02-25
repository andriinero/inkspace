import styled from 'styled-components';

export const Button = styled.input`
  padding: 0.3rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.main_button_bg};

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 1rem;

  cursor: pointer;
`;
