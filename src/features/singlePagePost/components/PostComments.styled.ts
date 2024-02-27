import styled from 'styled-components';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;

  width: 300px;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.color.comments_bg_primary};
  box-shadow: 0 0 2em rgb(0 0 0 / 0.3);

  transition: transform 400ms;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(500px)')};

  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

export const CommentList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
`;
