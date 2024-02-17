import styled from 'styled-components';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;

  margin-top: 30px;
  margin-left: 30px;
  background-color: ${({ theme }) => theme.color.bg_secondary};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ListItem = styled.div`
  padding: 0.5rem 1rem;

  font-size: 0.9rem;
  font-weight: 300;

  transition: color 100ms, background-color 100ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text_clr_secondary};
  }

  &:first-child {
    padding-top: 1rem;
  }

  &:last-child {
    padding-bottom: 1rem;
  }
`;
