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

import Dialog from '@/components/general/Dialog';
import * as S from './SignUpForm.styled';

const LoginForm = () => {
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
    <Dialog isModalOpen={isModalOpen} onModalClose={handleCloseModal}>
      <S.Wrapper>
        <S.HeaderWrapper>
          <S.Header>Sign up</S.Header>
          <S.SubText>Sign up with your username and password</S.SubText>
        </S.HeaderWrapper>
        <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
          <S.InputWrapper>
            <S.StyledInputLabel htmlFor="sign-up-username">
              Your Username
            </S.StyledInputLabel>
            <S.StyledInputText
              {...register('username')}
              id="sign-up-username"
              type="text"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.username)}>
              {errors.username?.message}
            </S.StyledErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.StyledInputLabel htmlFor="sign-up-email">Your Email</S.StyledInputLabel>
            <S.StyledInputText {...register('email')} id="sign-up-email" type="email" />
            <S.StyledErrorMessage $isVisible={Boolean(errors.email)}>
              {errors.email?.message}
            </S.StyledErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.StyledInputLabel htmlFor="sign-up-password">Password</S.StyledInputLabel>
            <S.StyledInputText
              {...register('password')}
              id="sign-up-password"
              type="password"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.password)}>
              {errors.password?.message}
            </S.StyledErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.StyledInputLabel htmlFor="sign-up-password-confirm">
              Confirm Password
            </S.StyledInputLabel>
            <S.StyledInputText
              {...register('confirmPassword')}
              id="sign-up-password-confirm"
              type="password"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.confirmPassword)}>
              {errors.confirmPassword?.message}
            </S.StyledErrorMessage>
          </S.InputWrapper>
          <S.ControlsWrapper>
            <S.StyledErrorMessage $isVisible={Boolean(error)}>
              {error?.errors![0].msg}
            </S.StyledErrorMessage>
            <S.SubmitButton
              type="submit"
              whileTap={ButtonInteraction.whileTap.animation}
            />
          </S.ControlsWrapper>
        </S.Form>
      </S.Wrapper>
    </Dialog>
  );
};

export default LoginForm;
