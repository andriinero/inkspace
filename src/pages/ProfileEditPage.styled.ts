import styled from 'styled-components';
import { ErrorMessage } from '@/styles/components/ErrorMessage';
import { FormButton } from '@/styles/components/FormButton';
import { InputLabel } from '@/styles/components/InputLabel';
import { InputText } from '@/styles/components/InputText';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 3rem 0;
`;

export const Header = styled.h2`
  font-family: ${({ theme }) => theme.font.times};
  font-weight: 400;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-wrap: break-word;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInputLabel = styled(InputLabel)`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.font.times};
  text-align: center;
`;

export const StyledInputText = styled(InputText)`
  min-width: 300px;
`;

export const StyledInputTextArea = styled.textarea`
  ${InputText}
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;
`;

export const SubmitButton = styled(FormButton)``;
