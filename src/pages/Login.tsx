import { fetchAuthData, login, selectAuthData } from '@/features/auth/authSlice';
import { Wrapper } from './Login.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Navigate } from 'react-router-dom';
import ActionButton from '@/components/general/ActionButton';

const Login = () => {
  const authData = useAppSelector(selectAuthData);

  const dispatch = useAppDispatch();

  const onLoginClick = async (): Promise<void> => {
    try {
      await dispatch(login({ username: 'CoolGirlNerd', password: 'strongpass1' }));
      dispatch(fetchAuthData());
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  if (authData) return <Navigate to="/" />;

  return (
    <Wrapper>
      <ActionButton onButtonClick={onLoginClick} value="Authenticate user" />
    </Wrapper>
  );
};

export default Login;
