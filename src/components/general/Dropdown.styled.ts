import styled from 'styled-components';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;

  margin-top: 30px;
  margin-left: 30px;
  background-color: ${({ theme }) => theme.color.main_bg_secondary};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

