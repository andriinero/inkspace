import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 1;

  padding: 2rem;
  min-width: 50ch;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.main_bg_secondary};
  box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
`;
