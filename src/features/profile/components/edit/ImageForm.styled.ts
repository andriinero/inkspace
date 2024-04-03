import styled from 'styled-components';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import { InputLabel } from '@/components/styled/InputLabel';
import { GreenButton } from '@/components/styled/GreenButton';
import { InputFile } from '@/components/styled/InputFile.styled';

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
  gap: 0.2rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
`;

export const StyledInputLabel = styled(InputLabel)`
  font-size: 1rem;
  font-size: 0.9rem;
`;

export const StyledInputFile = styled(InputFile)`
  min-width: 40ch;
  background-color: ${({ theme }) => theme.color.main_bg_primary};
  border-radius: 6px;

  &:focus {
    outline: none;
    box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
  }
  &::-webkit-file-upload-button {
    background-color: ${({ theme }) => theme.color.main_bg_primary};
  }
`;

export const InputDescription = styled.span`
  align-self: flex-start;

  font-size: 0.9rem;
  font-weight: 300;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1rem;
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const SubmitButton = styled(GreenButton)``;

export const CancelButton = styled(GreenButton)``;
