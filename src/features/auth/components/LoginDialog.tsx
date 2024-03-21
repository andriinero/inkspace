import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  closeLoginModal,
  initAuth,
  postLogin,
  selectIsLoginModalOpen,
} from '../authSlice';

import { FadeIn } from '@/styles/animations/FadeIn';

import { AnimatePresence } from 'framer-motion';
import {
  ControlsWrapper,
  InputWrapper,
  StyledInputLabel,
  LoginForm,
  LoginWrapper,
  StyledInputText,
  SubmitButton,
  Wrapper,
  WrapperBackdrop,
  Header,
  SubText,
  HeaderWrapper,
  StyledErrorMessage,
} from './LoginDialog.styled';
import { useForm } from 'react-hook-form';
import { LoginSchema, TLoginSchema } from '@/types/formSchemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorData } from '@/types/responseData/error/ErrorData';

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

  useEffect(() => {
    const positionValue = isModalOpen ? 'fixed' : 'static';

    document.querySelector('html')!.style.position = positionValue;
  }, [isModalOpen]);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
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
        <Wrapper>
          <WrapperBackdrop
            $isOpen={isModalOpen}
            onClick={handleCloseModal}
            initial={FadeIn.hidden}
            animate={FadeIn.visible}
            transition={{ duration: 0.2 }}
            exit={FadeIn.hidden}
          ></WrapperBackdrop>
          <LoginWrapper
            initial={FadeIn.hidden}
            animate={FadeIn.visible}
            transition={{ duration: 0.2 }}
            exit={FadeIn.hidden}
          >
            <HeaderWrapper>
              <Header>Welcome Back</Header>
              <SubText>Sign in with your username and password</SubText>
            </HeaderWrapper>
            <LoginForm onSubmit={handleSubmit(handleSubmitLogin)}>
              <InputWrapper>
                <StyledInputLabel htmlFor="login-username">
                  Your username
                </StyledInputLabel>
                <StyledInputText
                  id="login-username"
                  {...register('username', { required: 'Username is required' })}
                  type="text"
                />
                <StyledErrorMessage $isVisible={Boolean(errors.username)}>
                  {errors.username?.message}
                </StyledErrorMessage>
              </InputWrapper>
              <InputWrapper>
                <StyledInputLabel htmlFor="login-password">Password</StyledInputLabel>
                <StyledInputText
                  id="login-password"
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                />
                <StyledErrorMessage $isVisible={Boolean(errors.password)}>
                  {errors.password?.message}
                </StyledErrorMessage>
              </InputWrapper>
              <ControlsWrapper>
                <StyledErrorMessage $isVisible={Boolean(error)}>
                  {error?.message}
                </StyledErrorMessage>
                <SubmitButton value="Submit" type="submit" />
              </ControlsWrapper>
            </LoginForm>
          </LoginWrapper>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default LoginDialog;
