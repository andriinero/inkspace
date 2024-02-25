import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }

  html {
    overflow: -moz-scrollbars-vertical; 
    overflow-y: scroll;
  }
  
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.scrollbar_bg_thumb};    
  }
  
  *::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.scrollbar_bg_track};    
  }

  body {
    color: ${({ theme }) => theme.color.text_primary};
  }
`;

export default GlobalStyles;
