import styled from 'styled-components';
import tw from 'twin.macro';
import { DestructiveButton } from './DestructiveButton.styled';
import CancelButton from './CancelButton';

export const Wrapper = styled.div`
  ${tw`flex flex-col gap-4 z-10 p-7 rounded bg-white`}
`;

export const Header = styled.h3`
  ${tw`font-light`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex justify-end gap-4`}
`;

export const StyledCancelButton = styled(CancelButton)`
  ${tw`text-base text-sm font-light`}
`;

export const StyledDestructiveButton = styled(DestructiveButton)`
  ${tw`text-base text-sm`}
`;
