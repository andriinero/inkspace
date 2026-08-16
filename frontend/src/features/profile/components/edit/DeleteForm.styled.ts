import InputDescription from '@/components/general/InputDesciption';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Form = styled.form`
  ${tw`flex flex-col justify-center items-center gap-4`}
`;

export const Header = styled.h3`
  ${tw`mb-2`}
`;

export const InputWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center gap-4 w-full`}
`;

export const InputDescriptionDanger = styled(InputDescription)`
  ${tw`self-start text-sm text-red-800`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex self-end gap-4`}
`;
