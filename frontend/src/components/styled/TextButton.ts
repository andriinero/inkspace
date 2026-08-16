import styled from 'styled-components';
import { AppButton } from './AppButton.styled';
import tw from 'twin.macro';

export const TextButton = styled(AppButton)`
  ${tw`text-green-700 font-medium flex items-center text-base`}
`;
