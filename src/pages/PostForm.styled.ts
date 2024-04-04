import styled from 'styled-components';
import { PostBody } from '@/styles/PostBody.styled';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import { InputText } from '@/components/styled/InputText';
import { InputLabel } from '@/components/styled/InputLabel';
import { FormButton } from '@/components/styled/FormButton';
import { motion } from 'framer-motion';
import { InputFile } from '@/components/styled/InputFile.styled';

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

export const StyledInputFile = styled(InputFile)`
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

export const StyledInactiveButton = styled(FormButton)``;
