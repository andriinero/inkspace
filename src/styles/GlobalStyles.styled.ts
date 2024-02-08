import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }

  body {
    color: ${({ theme }) => theme.color.text_clr_primary};
  }
`;

export default GlobalStyles;
