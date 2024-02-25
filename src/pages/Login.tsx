import {
  fetchAuthData,
  login,
  selectAuthData,
  selectLoginState,
  selectToken,
} from '@/features/auth/authSlice';
import { Wrapper } from './Login.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ActionButton from '@/components/general/ActionButton';

const Login = () => {
  const token = useAppSelector(selectToken);
  const authData = useAppSelector(selectAuthData);
  const { isLoading, error } = useAppSelector(selectLoginState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('fetching auth data');

    dispatch(fetchAuthData());
  }, [dispatch, token]);

  const onLoginClick = (): void => {
    dispatch(login({ username: 'CoolGirlNerd', password: 'strongpass1' }));
  };

  if (authData) return <Navigate to="/" />;

  return (
    <Wrapper>
      <ActionButton onButtonClick={onLoginClick} value="Authenticate user" />
    </Wrapper>
  );
};

export default Login;
