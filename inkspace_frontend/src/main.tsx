import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './app/store';

import 'styles/index.css';
import GlobalStyles from './styles/GlobalStyles.styled';
import mainTheme from './styles/MainTheme';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import { IconContext } from 'react-icons';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <IconContext.Provider value={{ size: '1rem' }}>
        <ThemeProvider theme={mainTheme}>
          <GlobalStyles />
          <Router />
        </ThemeProvider>
      </IconContext.Provider>
    </Provider>
  </React.StrictMode>,
);
