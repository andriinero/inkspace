import styled from 'styled-components';
import { AppButton } from './AppButton.styled';
import tw from 'twin.macro';

export const HollowButton = styled(AppButton)<{
  $isActive?: boolean;
  className?: string;
}>(({ $isActive, className }) => [
  tw`py-2 px-3 text-xs font-light rounded-3xl ring-1 ring-gray-800`,
  $isActive && tw`bg-gray-900 text-white`,
  className,
]);
