import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';

import { ThemeProvider } from 'styled-components';
import mainTheme from './styles/MainTheme';
import GlobalStyles from './styles/GlobalStyles.styled';

import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
