import styled from 'styled-components';

export const WrapperHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.border_clr};
`;
