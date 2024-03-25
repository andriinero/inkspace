import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  closeLoginModal,
  initAuth,
  postSignUp,
  selectIsLoginModalOpen,
  selectPostLoginState,
} from '../authSlice';

import { LoginSchema, TLoginSchema } from '@/types/formSchemas/LoginSchema';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import Dialog from '@/components/general/Dialog';
import * as S from './LoginForm.styled';

const LoginForm = () => {
  const [error, setError] = useState<ErrorData | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const isModalOpen = useAppSelector(selectIsLoginModalOpen);
  const { isLoading } = useAppSelector(selectPostLoginState);

  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    dispatch(closeLoginModal());
  };

  const handleSubmitLogin = async (formData: TLoginSchema): Promise<void> => {
    try {
      if (!isLoading) {
        const response = await dispatch(postSignUp(formData)).unwrap();

        if (response) {
          dispatch(initAuth());
          dispatch(closeLoginModal());
        }
      }
    } catch (err) {
      setError(err as ErrorData);
    }
  };

  return (
    <Dialog isModalOpen={isModalOpen} onModalClose={handleCloseModal}>
      <S.LoginWrapper>
        <S.HeaderWrapper>
          <S.Header>Welcome Back</S.Header>
          <S.SubText>Sign in with your username and password</S.SubText>
        </S.HeaderWrapper>
        <S.LoginForm onSubmit={handleSubmit(handleSubmitLogin)}>
          <S.InputWrapper>
            <S.StyledInputLabel htmlFor="login-username">
              Your username
            </S.StyledInputLabel>
            <S.StyledInputText
              {...register('username', { required: 'Username is required' })}
              id="login-username"
              type="text"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.username)}>
              {errors.username?.message}
            </S.StyledErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.StyledInputLabel htmlFor="login-password">Password</S.StyledInputLabel>
            <S.StyledInputText
              {...register('password', { required: 'Password is required' })}
              id="login-password"
              type="password"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.password)}>
              {errors.password?.message}
            </S.StyledErrorMessage>
          </S.InputWrapper>
          <S.ControlsWrapper>
            <S.StyledErrorMessage $isVisible={Boolean(error)}>
              {error?.message}
            </S.StyledErrorMessage>
            <S.SubmitButton
              type="submit"
              whileTap={ButtonInteraction.whileTap.animation}
            />
          </S.ControlsWrapper>
        </S.LoginForm>
      </S.LoginWrapper>
    </Dialog>
  );
};

export default LoginForm;
