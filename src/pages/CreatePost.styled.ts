import styled from 'styled-components';
import { GreenButton } from '@/styles/components/GreenButton';
import { PostBody } from '@/styles/PostBody.styled';
import { ErrorMessage } from '@/styles/components/ErrorMessage';
import { InputText } from '@/styles/components/InputText';
import { InputLabel } from '@/styles/components/InputLabel';

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
    ${PostBody}
    padding: 0.5rem;
    min-height: 300px;
  }
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const StyledInputLabel = styled(InputLabel)``;

export const StyledInputText = styled(InputText)``;

export const Header = styled.h2``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-wrap: break-word;
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const SubmitButton = styled(GreenButton)`
  align-self: flex-start;
`;
