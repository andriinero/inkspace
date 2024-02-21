import styled from 'styled-components';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;

  width: 400px;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.color.bg_secondary};

  transition: transform 400ms;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(600px)')};
`;
