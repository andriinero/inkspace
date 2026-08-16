import styled from 'styled-components';
import tw from 'twin.macro';
import { TextButton } from '../styled/TextButton';
import AppIcon from './AppIcon';

export const StyledTextButton = styled(TextButton)`
  ${tw``}
`;

export const Input = styled.input`
  ${tw`hidden`}
`;

export const StyledAppIcon = styled(AppIcon)`
  ${tw`flex text-green-700`}
`;
