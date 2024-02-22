import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100dvh;
  background-color: ${({ theme }) => theme.color.main_bg_primary};
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ErrorHeader = styled.h1`
  font-size: 3rem;
`;

export const ErrorMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
`;
