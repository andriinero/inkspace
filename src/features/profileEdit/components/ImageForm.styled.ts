import styled from 'styled-components';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import { FormButton } from '@/components/styled/FormButton';
import { InputLabel } from '@/components/styled/InputLabel';
import InputFile from '@/components/general/InputFile';

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

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const InputItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledInputLabel = styled(InputLabel)`
  font-size: 1rem;
  font-size: 0.9rem;
`;

export const StyledInputFile = styled(InputFile)`
  &:focus {
    outline: none;
    box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
  }
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const SaveButton = styled(FormButton)`
  align-self: flex-start;
`;
