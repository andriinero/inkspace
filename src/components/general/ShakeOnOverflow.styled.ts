import { styled, keyframes, css } from 'styled-components';

export const shake = keyframes`
  0% {
    transform: translateX(0);
  } 

  25% {
    transform: translateX(-2px);
  }
  
  50% {
    transform: translateX(2px);
  }

  100% {
    transform: translateX(0);
  }
`;

export const Wrapper = styled.span<{
  $isOverflown: boolean;
  $shakeDuration: number;
  $iterationCount: number;
}>`
  animation: ${({ $isOverflown, $shakeDuration, $iterationCount }) =>
    css`
      ${$isOverflown ? shake : ''} ${$shakeDuration}ms linear ${$iterationCount}
    `};
`;
