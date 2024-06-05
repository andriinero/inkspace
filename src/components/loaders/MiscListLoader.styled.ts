import styled from "styled-components";

export const Item = styled.div`
  min-height: 6ch;
  background-color: ${({ theme }) => theme.color.loader_bg};
`;
