import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  closeLoginModal,
  initAuth,
  postLogin,
  selectIsLoginModalOpen,
} from '../authSlice';

import { FadeIn } from '@/styles/animations/FadeIn';
import { LoginSchema, TLoginSchema } from '@/types/formSchemas/LoginSchema';
import { ErrorData } from '@/types/responseData/error/ErrorData';

import * as S from './LoginDialog.styled';
import { AnimatePresence } from 'framer-motion';

const LoginDialog = () => {
  const [error, setError] = useState<ErrorData | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const isModalOpen = useAppSelector(selectIsLoginModalOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const positionValue = isModalOpen ? 'fixed' : 'static';
    document.querySelector('html')!.style.position = positionValue;
  }, [isModalOpen]);

  const handleCloseModal = (): void => {
    dispatch(closeLoginModal());
  };

  const handleSubmitLogin = async (formData: TLoginSchema): Promise<void> => {
    try {
      const response = await dispatch(postLogin(formData)).unwrap();

      if (response) {
        dispatch(initAuth());
        dispatch(closeLoginModal());
      }
    } catch (err) {
      setError(err as ErrorData);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <S.Wrapper>
          <S.WrapperBackdrop
            $isOpen={isModalOpen}
            onClick={handleCloseModal}
            initial={FadeIn.hidden}
            animate={FadeIn.visible}
            transition={{ duration: 0.2 }}
            exit={FadeIn.hidden}
          ></S.WrapperBackdrop>
          <S.LoginWrapper
            initial={FadeIn.hidden}
            animate={FadeIn.visible}
            transition={{ duration: 0.2 }}
            exit={FadeIn.hidden}
          >
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
                <S.SubmitButton type="submit" />
              </S.ControlsWrapper>
            </S.LoginForm>
          </S.LoginWrapper>
        </S.Wrapper>
      )}
    </AnimatePresence>
  );
};

export default LoginDialog;
