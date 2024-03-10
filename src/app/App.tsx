import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';

import { initAuth, selectFetchAuthDataState } from '@/features/auth/authSlice';

import Header from '@/layout/Header';
import { Outlet } from 'react-router-dom';
import { Wrapper, WrapperMain } from './App.styled';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  // FIXME: auth loading state
  const { isLoading } = useAppSelector(selectFetchAuthDataState);

  return (
    <>
      {!isLoading && (
        <Wrapper>
          <Header />
          {/* TODO: fix wrappers padding  */}
          <WrapperMain>
            <Outlet />
          </WrapperMain>
        </Wrapper>
      )}
    </>
  );
};

export default App;
