import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './app/store';

import mainTheme from './styles/MainTheme';
import GlobalStyles from './styles/GlobalStyles.styled';

import Router from './Router';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
