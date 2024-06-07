import styled from 'styled-components';
import tw from 'twin.macro';

export const ErrorMessage = styled.span<{ $isVisible: boolean }>(
  ({ $isVisible }) => [
    tw`hidden before:content-[* ] text-sm font-light italic text-red-800`,
    $isVisible && tw`block`,
  ],
);
