import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';

import { fetchAuthData, initializeToken, selectToken } from '@/features/auth/authSlice';

import Header from '@/layout/Header';
import { Outlet } from 'react-router-dom';
import { Wrapper, WrapperMain } from './App.styled';
import { fetchProfileData } from '@/features/profile/profileSlice';

const App = () => {
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      dispatch(initializeToken());

      if (token) {
        await dispatch(fetchAuthData());
        await dispatch(fetchProfileData());
      }
    };

    init();
  }, [dispatch, token]);

  return (
    <Wrapper>
      <Header />
      {/* TODO: fix wrapper layers */}
      <WrapperMain>
        <Outlet />
      </WrapperMain>
    </Wrapper>
  );
};

export default App;
