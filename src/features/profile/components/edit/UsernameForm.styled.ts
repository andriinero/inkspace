import styled from 'styled-components';
import tw from 'twin.macro';

export const Form = styled.form`
  ${tw`flex flex-col justify-center items-center gap-4`}
`;

export const InputWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center gap-4 w-full`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex self-end gap-4`}
`;
