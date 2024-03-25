import styled from 'styled-components';

export const ErrorMessage = styled.span<{ $isVisible: boolean }>`
  display: inline-block;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};

  color: ${({ theme }) => theme.color.error_text};
  font-size: 0.8rem;
  font-weight: 300;
  font-style: italic;

  &::before {
    content: '* ';
  }
`;
