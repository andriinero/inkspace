import styled from 'styled-components';
import { InputText } from '@/styles/components/InputText';
import { motion } from 'framer-motion';
import { ErrorMessage } from '@/styles/components/ErrorMessage';
import { InputLabel } from '@/styles/components/InputLabel';
import { FormButton } from '@/styles/components/FormButton';

export const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  height: 100dvh;
  width: 100dvw;
`;

export const WrapperBackdrop = styled(motion.div)<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.dialog_backdrop_bg};
`;

export const LoginWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  position: absolute;

  padding: 7rem 10rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.dialog_modal_bg};
  box-shadow: 0 0 3em rgb(0 0 0 / 0.3);
  text-align: center;

  color: ${({ theme }) => theme.color.text_primary};
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

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInputLabel = styled(InputLabel)`
  font-size: 0.8rem;
  font-weight: 300;
`;

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

export const CloseButton = styled(FormButton)``;
