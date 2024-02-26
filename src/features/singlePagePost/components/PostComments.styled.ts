import styled from 'styled-components';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;

  width: 400px;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.color.main_bg_secondary};

  transition: transform 400ms;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(500px)')};
`;

export const CommentList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1rem;

list-style-type: decimal;
`;
