import styled from 'styled-components';

export const Wrapper = styled.ul<{ $isOpen: boolean; $isAlignedLeft: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;

  padding: 1rem;
  margin-top: 25px;
  margin-left: ${({ $isAlignedLeft }) => ($isAlignedLeft ? '-95px' : '25px')};
  background-color: ${({ theme }) => theme.color.main_bg_secondary};
  border-radius: 6px;

  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  opacity: 1;
  transition:
    transform 200ms,
    opacity 200ms;

  @starting-style {
    transform: translateY(-10px);
    opacity: 0.1;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;
