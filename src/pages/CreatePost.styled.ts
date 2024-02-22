import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;

  padding: 3rem;
`;

export const Header = styled.h2``;

export const Form = styled.form``;

export const SubmitButton = styled.input`
  padding: 0.5rem 0.7rem;
  border: 1px solid transparent;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.main_button_bg};

  color: ${({ theme }) => theme.color.text_primary};

  cursor: pointer;
`;
