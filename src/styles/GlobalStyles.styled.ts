import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    font-family: ${({ theme }) => theme.font.roboto};
    overflow-wrap: anywhere;
  }

  html {
    width: 100%;
    background-color: ${({ theme }) => theme.color.main_bg_primary};
    overflow: -moz-scrollbars-vertical; 
    overflow-y: scroll;
  }
  
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.scrollbar_bg_thumb};    
    
    transition: color 200ms;

    &:hover {
      background-color: ${({ theme }) => theme.color.scrollbar_bg_thumb_hover};
    }
  }
  
  *::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.scrollbar_bg_track};    
  }

  body {
    color: ${({ theme }) => theme.color.text_primary};
  }
`;

export default GlobalStyles;
