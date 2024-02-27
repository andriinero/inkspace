import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;

  padding: 3rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const InputLabel = styled.label`
  cursor: pointer;
`;

export const Header = styled.h2``;

export const InputText = styled.input`
  padding: 0.3rem 0.4rem;
  border: 1px solid transparent;
  border-radius: 16px;
`;

export const Form = styled.form`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
`;
