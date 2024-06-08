import styled from 'styled-components';
import SubmitButton from './SubmitButton';
import tw from 'twin.macro';

export const DestructiveButton = styled(SubmitButton)`
  ${tw`bg-transparent text-red-800 font-medium`}
`;
