import Router from './Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles.styled';
import mainTheme from './styles/MainTheme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
