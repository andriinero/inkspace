import { useEffect } from 'react';
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
  CloseButton,
  ControlsWrapper,
  InputWrapper,
  Label,
  LoginForm,
  LoginWrapper,
  StyledInputText,
  SubmitButton,
  Wrapper,
  WrapperBackdrop,
} from './LoginDialog.styled';
import { useForm } from 'react-hook-form';
import { LoginSchema, TLoginSchema } from '@/types/formSchemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginDialog = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginSchema) });

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
    const response = await dispatch(postLogin(formData)).unwrap();

    if (response) {
      dispatch(initAuth());
      dispatch(closeLoginModal());
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
            transition={FadeIn.transition}
            exit={FadeIn.hidden}
          ></WrapperBackdrop>
          <LoginWrapper
            initial={FadeIn.hidden}
            animate={FadeIn.visible}
            transition={FadeIn.transition}
            exit={FadeIn.hidden}
          >
            <LoginForm onSubmit={handleSubmit(handleSubmitLogin)}>
              <InputWrapper>
                <Label>Your username</Label>
                <StyledInputText
                  {...register('username', { required: 'Username is required' })}
                  type="text"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Password</Label>
                <StyledInputText
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                />
              </InputWrapper>
              <ControlsWrapper>
                <CloseButton onClick={handleCloseModal} value="Close" type="button" />
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
