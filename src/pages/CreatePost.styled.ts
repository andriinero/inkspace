import styled from 'styled-components';
import ActionButton from '@/components/general/ActionButton';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 3rem;
  width: 80ch;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
`;

export const PostWrapper = styled.div`
  & > * {
    padding: 0.5rem;
    min-height: 300px;
  }
`;

export const InputItem = styled.div`
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
  flex-direction: column;
  gap: 2rem;

  overflow-wrap: break-word;
`;

export const SubmitButton = styled(ActionButton)`
  align-self: flex-start;
`;
