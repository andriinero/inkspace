import styled from 'styled-components';

export const WrapperFooter = styled.footer`
  grid-area: footer;

  padding: 1rem;
  border-top: 1px solid ${({theme}) => theme.color.border_clr};
`;
