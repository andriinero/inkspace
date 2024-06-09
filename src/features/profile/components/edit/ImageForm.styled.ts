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
  ${tw`rounded min-w-[40ch] text-xs outline-none focus:shadow`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex self-end gap-4`}
`;
