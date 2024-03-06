import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Navigate } from 'react-router-dom';

import {
  fetchAuthData,
  initAuth,
  postLogin,
  selectAuthData,
} from '@/features/auth/authSlice';

import { Wrapper } from './Login.styled';
import ActionButton from '@/components/general/ActionButton';

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
      <ActionButton onButtonClick={onFirstLoginClick} value="Authenticate CoolGirlNerd" />
      <ActionButton onButtonClick={onSecondLoginClick} value="Authenticate CoolGuyNerd" />
    </Wrapper>
  );
};

export default Login;
