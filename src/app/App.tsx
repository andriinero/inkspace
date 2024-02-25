import { Wrapper, WrapperMain } from './App.styled';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { fetchAuthData } from '@/features/auth/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthData());
  }, [dispatch]);

  return (
    <Wrapper>
      <Header />
      {/* TODO: fix wrapper layers */}
      <WrapperMain>
        <Outlet />
      </WrapperMain>
      <Footer />
    </Wrapper>
  );
};

export default App;
