import { styled, keyframes } from 'styled-components';

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

export const Counter = styled.span<{ $isOverflown?: boolean }>`
  animation: ${({ $isOverflown }) => ($isOverflown ? shake : null)} 100ms linear 2;
`;
