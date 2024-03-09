import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Navigate } from 'react-router-dom';

import {
  fetchAuthData,
  initAuth,
  postLogin,
  selectAuthData,
} from '@/features/auth/authSlice';

import { Wrapper } from './Login.styled';
import { GreenButton } from '@/styles/components/GreenButton';

const Login = () => {
  const authData = useAppSelector(selectAuthData);

  const dispatch = useAppDispatch();

  const onFirstLoginClick = async (): Promise<void> => {
    try {
      await dispatch(postLogin({ username: 'CoolGirlNerd', password: 'strongpass1' }));
      dispatch(initAuth());
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const onSecondLoginClick = async (): Promise<void> => {
    try {
      await dispatch(postLogin({ username: 'CoolGuyNerd', password: 'strongpass1' }));
      dispatch(fetchAuthData());
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  if (authData) return <Navigate to="/" />;

  return (
    <Wrapper>
      <GreenButton
        onClick={onFirstLoginClick}
        type="button"
        value="Authenticate CoolGirlNerd"
      />
      <GreenButton
        onClick={onSecondLoginClick}
        type="button"
        value="Authenticate CoolGuyNerd"
      />
    </Wrapper>
  );
};

export default Login;
