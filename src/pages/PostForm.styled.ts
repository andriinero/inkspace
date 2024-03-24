import styled from 'styled-components';
import { PostBody } from '@/styles/PostBody.styled';
import { ErrorMessage } from '@/styles/components/ErrorMessage';
import { InputText } from '@/styles/components/InputText';
import { InputLabel } from '@/styles/components/InputLabel';
import { FormButton } from '@/styles/components/FormButton';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 3rem 0;
  width: 80ch;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const PostWrapper = styled.div`
  & > * {
    ${PostBody}
    padding: 1.5rem;
    min-height: 320px;
    box-shadow: 0 0 1em rgb(0 0 0 / 0.3);

    &:focus {
      outline: none;
    }
  }
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

export const StyledErrorMessage = styled(ErrorMessage)``;

export const ControlsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1rem;
`;

export const StyledButton = styled(FormButton)``;

export const StyledInactiveButton = styled(FormButton)`
  &:hover {
    cursor: not-allowed;
  }
`;
