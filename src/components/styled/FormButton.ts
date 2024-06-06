import styled from 'styled-components';
import { AppButton } from './AppButton.styled';
import tw from 'twin.macro';

export const FormButton = styled(AppButton)`
  ${tw`py-2 px-3 rounded-full text-xs bg-green-700 text-white`}
`;
