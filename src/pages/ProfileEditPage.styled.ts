import styled from 'styled-components';
import { ErrorMessage } from '@/styles/components/ErrorMessage';
import { FormButton } from '@/styles/components/FormButton';
import { InputLabel } from '@/styles/components/InputLabel';
import { InputText } from '@/styles/components/InputText';
import AppImage from '@/features/appImages/components/AppImage';
import { Username } from '@/styles/components/Username.styled';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(50ch, 80ch) minmax(30ch, 40ch);
  justify-content: center;
  gap: 4rem;

  min-height: 100%;
`;

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 3rem;
  border-right: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const Header = styled.h2`
  font-family: ${({ theme }) => theme.font.times};
  font-weight: 400;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-wrap: break-word;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;
`;

export const SubmitButton = styled(FormButton)`
  align-self: flex-end;

  padding-left: 3rem;
  padding-right: 3rem;
`;

export const WrapperAside = styled.div`
  display: flex;
  flex-direction: column;

  padding: 3rem 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileIcon = styled(AppImage)`
  width: 88px;
  height: 88px;
  border-radius: 50%;
`;

export const StyledUserName = styled(Username)`
  max-width: none;

  white-space: break-spaces;
  word-wrap: break-word;
`;

export const FollowCount = styled.span`
  display: inline-block;

  font-weight: 300;
`;

export const SignUpDate = styled.span`
  display: inline-block;

  font-size: 0.8rem;
  font-weight: 300;
  font-style: italic;
`;
