import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header'
    'main aside'
    'footer footer';

  min-height: 100dvh;
  background-color: ${({ theme }) => theme.color.bg_primary};
`;
