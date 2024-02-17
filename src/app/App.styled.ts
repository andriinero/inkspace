import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'header' 'main' 'footer';

  min-height: 100dvh;
  background-color: ${({ theme }) => theme.color.bg_primary};
`;

export const WrapperMain = styled.main`
  grid-area: main;
  display: grid;
  grid-template-columns: 75ch 25ch;
  justify-content: center;
  gap: 6rem;
`;
