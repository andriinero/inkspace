import styled from 'styled-components';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import { FormButton } from '@/components/styled/FormButton';
import { InputLabel } from '@/components/styled/InputLabel';
import { InputText } from '@/components/styled/InputText';

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 3rem;
  border-right: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledInputLabel = styled(InputLabel)`
  font-size: 1rem;
  font-size: 0.9rem;
`;

export const StyledInputText = styled(InputText)`
  min-width: 300px;
  text-align: start;

  &:focus {
    outline: none;
    box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
  }
`;

export const StyledInputTextArea = styled.textarea`
  padding: 0.3rem 0.4rem;
  border: 1px solid transparent;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.color.input_text_border};
  resize: none;

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
  }
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const SaveButton = styled(FormButton)`
  align-self: flex-end;

  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;
