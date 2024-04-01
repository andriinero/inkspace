import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.div`
  min-height: 12ch;
  background-color: ${({ theme }) => theme.color.loader_bg};
`;
