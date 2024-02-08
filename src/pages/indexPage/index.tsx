import { Wrapper } from './index.styled';

import Header from './header/Header';
import Main from './main/Main';
import Aside from './aside/Aside';
import Footer from './footer/Footer';

const IndexLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
      <Aside />
      <Footer />
    </Wrapper>
  );
};

export default IndexLayout;
