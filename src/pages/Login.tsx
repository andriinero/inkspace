import {
  fetchAuthData,
  login,
  selectLoginState,
  selectToken,
} from '@/features/auth/authSlice';
import { LoginButton, Wrapper } from './Login.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';

const Login = () => {
  const token = useAppSelector(selectToken);
  const { isLoading, error } = useAppSelector(selectLoginState);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    console.log('fetching auth data');
    
    dispatch(fetchAuthData());
  }, [dispatch, token]);

  const onLoginClick = (): void => {
    dispatch(login({ username: 'CoolGirlNerd', password: 'strongpass1' }));
  };

  return (
    <Wrapper>
      <LoginButton onClick={onLoginClick} type="button" value="Login" />
    </Wrapper>
  );
};

export default Login;
