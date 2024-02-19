import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'header' 'main' 'footer';

  min-height: 100dvh;
  background-color: ${({ theme }) => theme.color.bg_primary};
`;

export const WrapperMain = styled.main``;
