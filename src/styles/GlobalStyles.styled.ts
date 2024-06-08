import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: ${({ theme }) => theme.font.roboto};
    ${tw`box-border m-0 p-0`}
  }

  html {
    overflow: -moz-scrollbars-vertical; 
    ${tw`overflow-y-scroll w-full`}
  }
`;

export default GlobalStyles;
