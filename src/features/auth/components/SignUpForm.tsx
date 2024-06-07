import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  closeSignUpModal,
  postSignUp,
  selectIsSignUpModalOpen,
  selectPostSignUpState,
} from '../authSlice';

import { SignUpSchema, TSignUpSchema } from '@/types/formSchemas/SignUpSchema';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import * as S from './SignUpForm.styled';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import { InputLabel } from '@/components/styled/InputLabel';
import SubmitButton from '@/components/general/SubmitButton';
import AuthPanel from './AuthPanel.styled';
import AuthForm from './AuthForm.styled';
import AuthInput from './AuthInput.styled';
import AuthConrolsWrapper from './AuthControlsWrapper.styled';

const SignUpFormm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const isModalOpen = useAppSelector(selectIsSignUpModalOpen);
  const { isLoading, error } = useAppSelector(selectPostSignUpState);

  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    dispatch(closeSignUpModal());
  };

  const handleFormSubmit = async (formData: TSignUpSchema): Promise<void> => {
    if (!isLoading) dispatch(postSignUp(formData));
  };

  return (
    <S.StyledDialog isModalOpen={isModalOpen} onModalClose={handleCloseModal}>
      <AuthPanel>
        <S.HeaderWrapper>
          <S.Header>Sign up</S.Header>
          <S.SubText>Sign up with your username and password</S.SubText>
        </S.HeaderWrapper>
        <AuthForm onSubmit={handleSubmit(handleFormSubmit)}>
          <S.InputWrapper>
            <InputLabel htmlFor="sign-up-username">Your Username</InputLabel>
            <AuthInput
              {...register('username')}
              id="sign-up-username"
              type="text"
            />
            <ErrorMessage $isVisible={Boolean(errors.username)}>
              {errors.username?.message}
            </ErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <InputLabel htmlFor="sign-up-email">Your Email</InputLabel>
            <AuthInput {...register('email')} id="sign-up-email" type="email" />
            <ErrorMessage $isVisible={Boolean(errors.email)}>
              {errors.email?.message}
            </ErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <InputLabel htmlFor="sign-up-password">Password</InputLabel>
            <AuthInput
              {...register('password')}
              id="sign-up-password"
              type="password"
            />
            <ErrorMessage $isVisible={Boolean(errors.password)}>
              {errors.password?.message}
            </ErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <InputLabel htmlFor="sign-up-password-confirm">
              Confirm Password
            </InputLabel>
            <AuthInput
              {...register('confirmPassword')}
              id="sign-up-password-confirm"
              type="password"
            />
            <ErrorMessage $isVisible={Boolean(errors.confirmPassword)}>
              {errors.confirmPassword?.message}
            </ErrorMessage>
          </S.InputWrapper>
          <AuthConrolsWrapper>
            <ErrorMessage $isVisible={Boolean(error)}>
              {error?.errors![0].msg}
            </ErrorMessage>
            <SubmitButton
              type="submit"
              whileTap={ButtonInteraction.whileTap.animation}
            >
              Sign Up
            </SubmitButton>
          </AuthConrolsWrapper>
        </AuthForm>
      </AuthPanel>
    </S.StyledDialog>
  );
};

export default SignUpFormm;
