import InputFile from '@/components/general/InputFile';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import { FormButton } from '@/components/styled/FormButton';
import { InputText } from '@/components/styled/InputText';
import { PostBody } from '@/styles/PostBody.styled';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`p-4 flex flex-col gap-8 py-12 max-w-2xl w-full`}
`;

export const InputContainer = styled.div`
  ${tw`flex flex-col items-center gap-4`}
`;

export const PostWrapper = styled.div`
  & > * {
    ${PostBody}
    ${tw`min-h-[320px] focus:outline-none`}
  }
`;

export const InputItem = styled.div`
  ${tw`flex flex-col gap-4 self-start`}
`;

export const StyledInputText = styled(InputText)`
  font-family: ${({ theme }) => theme.font.times};
  ${tw`px-0 max-w-lg w-full ring-0 shadow-none text-start outline-none`};
`;

export const StyledTitleInput = styled(StyledInputText)`
  ${tw`text-4xl `}
`;

export const StyledTopicInput = styled(StyledInputText)`
  ${tw`text-2xl text-gray-500`}
`;

export const StyledInputFile = styled(InputFile)`
  ${tw``}
`;

export const Form = styled.form`
  ${tw`flex flex-col gap-8 break-words`}
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const ControlsContainer = styled.div`
  ${tw`flex gap-4 self-end`}
`;

export const StyledButton = styled(FormButton)``;

export const StyledInactiveButton = styled(FormButton)``;
