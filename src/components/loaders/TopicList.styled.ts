import styled from 'styled-components';

export const Item = styled.div`
  width: 9ch;
  height: 4ch;
  background-color: ${({ theme }) => theme.color.loader_bg};
  border-radius: 16px;
`;
