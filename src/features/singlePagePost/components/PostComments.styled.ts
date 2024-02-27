import styled from 'styled-components';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;

  position: fixed;
  top: 0;
  right: 0;

  width: 300px;
  padding: 1rem;
  height: 100dvh;
  background-color: ${({ theme }) => theme.color.comments_bg_primary};
  box-shadow: 0 0 2em rgb(0 0 0 / 0.3);

  transition: transform 300ms;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(500px)')};

  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

export const Header = styled.h2`
  font-size: 1.3rem;
`;

export const CommentList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
