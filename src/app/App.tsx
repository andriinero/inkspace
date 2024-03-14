import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';

import { initAuth, selectFetchAuthDataState } from '@/features/auth/authSlice';

import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/utils/ScrollToTop';
import Header from '@/layout/Header';
import { Wrapper, WrapperMain } from './App.styled';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  const { isLoading } = useAppSelector(selectFetchAuthDataState);

  return (
    <>
      {!isLoading && (
        <Wrapper>
          <ScrollToTop />
          <Header />
          <WrapperMain>
            <Outlet />
          </WrapperMain>
        </Wrapper>
      )}
    </>
  );
};

export default App;
