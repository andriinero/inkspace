import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles.styled';
import { ThemeProvider } from 'styled-components';
import mainTheme from './styles/MainTheme';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
