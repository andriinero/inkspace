import styled from 'styled-components';
import { InputFile } from '@/components/styled/InputFile.styled';
import tw from 'twin.macro';

export const WrapperMain = styled.div`
  ${tw`flex flex-col gap-12 p-12 border-r border-gray-200`}
`;

export const Form = styled.form`
  ${tw`flex flex-col justify-center items-center gap-4`}
`;

export const InputWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center gap-4 w-full`}
`;

export const StyledInputFile = styled(InputFile)`
  &:focus {
    outline: none;
    box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
  }
  ${tw`rounded min-w-[40ch] text-xs`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex self-end gap-4`}
`;
