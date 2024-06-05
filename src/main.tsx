import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './app/store';

import 'styles/index.css';
import GlobalStyles from './styles/GlobalStyles.styled';
import mainTheme from './styles/MainTheme';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Router from './Router';

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
