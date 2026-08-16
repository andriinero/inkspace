import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useGuestLogin from '../hooks/useGuestLogin';

import {
  closeLoginModal,
  initAuth,
  postLogin,
  selectIsLoginModalOpen,
  selectPostLoginState,
} from '../authSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { LoginSchema, TLoginSchema } from '@/types/formSchemas/LoginSchema';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import * as S from './LoginForm.styled';
import { InputLabel } from '@/components/styled/InputLabel';
import AuthInput from './AuthInput.styled';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import SubmitButton from '@/components/general/SubmitButton';

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const handleGuestLogin = useGuestLogin();

  const isModalOpen = useAppSelector(selectIsLoginModalOpen);
  const { isLoading, error } = useAppSelector(selectPostLoginState);

  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    dispatch(closeLoginModal());
  };

  const handleFormSubmit = async (formData: TLoginSchema): Promise<void> => {
    if (!isLoading) {
      const response = await dispatch(postLogin(formData)).unwrap();

      if (response) {
        dispatch(
          addPushNotification('login success', PushNotificationType.SUCCESS),
        );
        dispatch(initAuth());
        dispatch(closeLoginModal());
      }
    }
  };

  const isSubmitDisabled = isSubmitting;

  return (
    <S.StyledDialog isModalOpen={isModalOpen} onModalClose={handleCloseModal}>
      <S.StyledAuthPanel>
        <S.HeaderWrapper>
          <S.Header>Welcome Back</S.Header>
          <S.SubText>Sign in with your username and password</S.SubText>
        </S.HeaderWrapper>
        <S.StyledAuthForm onSubmit={handleSubmit(handleFormSubmit)}>
          <S.InputWrapper>
            <InputLabel htmlFor="login-username">Your username</InputLabel>
            <AuthInput
              {...register('username', { required: 'Username is required' })}
              id="login-username"
              type="text"
            />
            <ErrorMessage $isVisible={Boolean(errors.username)}>
              {errors.username?.message}
            </ErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <InputLabel htmlFor="login-password">Password</InputLabel>
            <AuthInput
              {...register('password', { required: 'Password is required' })}
              id="login-password"
              type="password"
            />
            <ErrorMessage $isVisible={Boolean(errors.password)}>
              {errors.password?.message}
            </ErrorMessage>
          </S.InputWrapper>
          <S.StyledAuthControlsWrapper>
            <SubmitButton disabled={isSubmitDisabled} type="submit">
              Log In
            </SubmitButton>
            <SubmitButton onClick={handleGuestLogin} type="button">
              Login Guest
            </SubmitButton>
          </S.StyledAuthControlsWrapper>
          <ErrorMessage $isVisible={Boolean(error)}>
            {error?.message}
          </ErrorMessage>
        </S.StyledAuthForm>
      </S.StyledAuthPanel>
    </S.StyledDialog>
  );
};

export default LoginForm;
