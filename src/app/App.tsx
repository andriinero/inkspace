import { useEffect } from 'react';
import { useAppDispatch } from './hooks';

import { fetchAuthData } from '@/features/auth/authSlice';

import Header from '@/layout/Header';
import { Outlet } from 'react-router-dom';
import { Wrapper, WrapperMain } from './App.styled';
import { fetchProfileData } from '@/features/profile/profileSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchAuthData());
      await dispatch(fetchProfileData());
    };

    init();
  }, [dispatch]);

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
