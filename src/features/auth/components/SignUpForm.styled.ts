import styled from 'styled-components';
import { InputText } from '@/components/styled/InputText';
import { motion } from 'framer-motion';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import { InputLabel } from '@/components/styled/InputLabel';
import { FormButton } from '@/components/styled/FormButton';

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  position: absolute;

  padding: 5rem 13rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.dialog_modal_bg};
  box-shadow: 0 0 3em rgb(0 0 0 / 0.3);

  color: ${({ theme }) => theme.color.text_primary};
  text-align: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.h2`
  font-size: 2rem;
  font-weight: 200;
  font-family: ${({ theme }) => theme.font.times};
`;

export const SubText = styled.p`
  font-weight: 300;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledInputLabel = styled(InputLabel)``;

export const StyledInputText = styled(InputText)`
  margin: 0 1.2rem;
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitButton = styled(FormButton)`
  margin: 0 3rem;
`;
