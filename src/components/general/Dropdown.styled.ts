import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.ul<{ $isOpen: boolean; $isAlignedLeft: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;

  margin-top: 25px;
  margin-left: ${({ $isAlignedLeft }) => ($isAlignedLeft ? '-95px' : '25px')};
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
  ${tw`p-3 bg-white border rounded-md shadow-sm`}
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;
